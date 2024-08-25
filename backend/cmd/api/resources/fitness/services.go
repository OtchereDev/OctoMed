package fitness

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/OtchereDev/ProjectAPI/cmd/api/resources/storage"
	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/sashabaranov/go-openai"
	"gorm.io/gorm"
)

func (u FitnessApp) GetOrCreateWaterConsumption(userId int, startDate time.Time) (models.WaterConsumption, error) {
	var waterConsumption models.WaterConsumption
	db := u.DB

	result := db.Where("user_id = ? AND DATE(created_at) = ?", userId, startDate).First(&waterConsumption)

	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		return waterConsumption, errors.New("failed to query the database")
	}

	// If not found, create a new record
	if result.RowsAffected == 0 {
		waterConsumption = models.WaterConsumption{
			NumberOfGlass: 0,
			UserID:        uint(userId),
			CreatedAt:     startDate,
		}

		if err := db.Create(&waterConsumption).Error; err != nil {
			return waterConsumption, errors.New("failed to create a new water consumption record")
		}
	}

	return waterConsumption, nil

}

func (u FitnessApp) IncreaseWaterConsumption(userId int, startDate time.Time) (models.WaterConsumption, error) {
	db := u.DB
	water, err := u.GetOrCreateWaterConsumption(userId, startDate)

	if err != nil {
		return water, err
	}

	water.NumberOfGlass += 1

	if err := db.Save(&water).Error; err != nil {
		return water, errors.New("failed to update water consumption record")
	}

	return water, err
}

func generateThreeMealsForHealthConditionAndAllergies(userID int, db *gorm.DB, openAI *openai.Client, date time.Time) ([]models.Diet, error) {
	// Initialize mealPlans
	var mealPlans []models.Diet

	// Fetch user health conditions
	var bioData models.BioData
	db.
		Preload("HealthConditions").
		Preload("Allergies").First(&bioData, "user_id = ?", userID)

	// Fetch user allergies
	healthConditions := bioData.HealthConditions
	allergies := bioData.Allergies

	// Convert health conditions and allergies to string arrays
	healthConditionNames := []string{"heart condition"}
	for _, condition := range healthConditions {
		healthConditionNames = append(healthConditionNames, condition.HealthCondition)
	}

	allergyNames := []string{"sea foods"}
	for _, allergy := range allergies {
		allergyNames = append(allergyNames, allergy.Allergy)
	}

	messages := []openai.ChatCompletionMessage{
		{
			Role:    "system",
			Content: "You are a nutrition expert who generates meal plans but optimize for based on their health conditions and allergies if they have any.The response should be a valid json string, having meal always having this structure 	{ 'name': 'name of food','type':breakfast', 'calories': 100, 'protein': 20,'fats': 50, 'carbs': 130} No explanation, No other sentence and dont include ```json ``` tag, just the array of object, dont nest it in another object with any property such as meals, dont do this {'meal':[{}]}, do this [{}]. Always use double quote of the properties",
		},
		{
			Role: "user",
			Content: fmt.Sprintf(
				"Generate three meals (breakfast, lunch, and dinner) for a user with the following health conditions: %v and the following allergies: %v.",
				healthConditionNames, allergyNames,
			),
		},
	}

	resp, err := openAI.CreateChatCompletion(context.Background(), openai.ChatCompletionRequest{
		Model:    openai.GPT4oMini,
		Messages: messages,
	})

	if err != nil {
		return mealPlans, err
	}

	contentStr := resp.Choices[0].Message.Content

	// Parse the JSON string into a slice of Meal
	var meals []models.Meal
	err = json.Unmarshal([]byte(contentStr), &meals)
	if err != nil {
		return nil, fmt.Errorf("error unmarshalling JSON: %v", err)
	}

	// Convert meals to Diet
	for _, meal := range meals {
		prompt := fmt.Sprintf("A delicious healthy meal called %s with a nice background", meal.Name)
		mealPlan := models.Diet{
			UserID:    uint(userID),
			Name:      meal.Name,
			Type:      meal.Type,
			Calories:  int(meal.Calories),
			Protein:   int(meal.Protein),
			Carbs:     int(meal.Carbs),
			Fats:      int(meal.Fats),
			Photo:     generateMealImage(prompt, meal.Name, openAI), // Generate meal image using DALL-E
			CreatedAt: date,
		}
		db.Create(&mealPlan)
		mealPlans = append(mealPlans, mealPlan)
	}

	return mealPlans, nil
}

func generateMealsForUser(userID int, db *gorm.DB, openAI *openai.Client) error {
	currentDate := time.Now()
	// Check if meals already exist for the user for the current day
	var existingMeals []models.Diet
	db.Where("user_id = ? AND DATE(created_at) = ?", userID, currentDate.Format("2006-01-02")).Find(&existingMeals)

	if len(existingMeals) >= 3 {
		return errors.New("three meals already exist for today")
	}

	mealPlans, err := generateThreeMealsForHealthConditionAndAllergies(userID, db, openAI, time.Now())
	if err != nil {
		fmt.Println(err.Error())
		return errors.New("failed to generate meal plans")
	}

	// Save each meal plan to the database
	for _, meal := range mealPlans {
		if err := db.Create(&meal).Error; err != nil {
			return errors.New("failed to save meal")
		}
	}

	return nil

}

func generateMealImage(prompt, title string, client *openai.Client) string {
	// Use DALL-E to generate an image of the meal
	reqUrl := openai.ImageRequest{
		Prompt:         prompt,
		Size:           openai.CreateImageSize1792x1024,
		ResponseFormat: openai.CreateImageResponseFormatURL,
		N:              1,
		Model:          openai.CreateImageModelDallE3,
	}

	ctx := context.Background()

	respUrl, err := client.CreateImage(ctx, reqUrl)
	if err != nil {
		fmt.Printf("Image creation error: %v\n", err)
		return ""
	}

	url, _ := storage.UploadFileFromURL(respUrl.Data[0].URL, title)

	return url
}

func generateExerciseForHealthCondition(userID int, db *gorm.DB, openAI *openai.Client, startDate time.Time) ([]models.Exercise, error) {
	// Initialize exercisePlans
	var exercisePlans []models.Exercise

	// Fetch user health conditions
	var bioData models.BioData
	db.
		Preload("HealthConditions").First(&bioData, "user_id = ?", userID)

	// Fetch user allergies
	healthConditions := bioData.HealthConditions

	// Convert health conditions and allergies to string arrays
	healthConditionNames := []string{}
	for _, condition := range healthConditions {
		healthConditionNames = append(healthConditionNames, condition.HealthCondition)
	}

	messages := []openai.ChatCompletionMessage{
		{
			Role:    "system",
			Content: "You are a exercise/gym expert who generates exercise plans but optimize for based on their health conditions and allergies if they have any.The response should be a valid json string, having meal always having this structure 	{'name': 'Push-Up Routine','total_duration': 15,'instructions': [{'title': 'Warm-Up','content': 'Perform a light warm-up for 5 minutes to prepare your muscles.','minutes': 5,},{'title': 'Push-Ups','content': 'Perform push-ups for 3 sets of 10 repetitions.','minutes': 10,}]} No explanation, No other sentence and dont include ```json ``` tag , just the array of object, dont nest it in another object with any property such as meals, dont do this {'exercises':[{}]}, do this [{}]. Always use double quote of the properties",
		},
		{
			Role: "user",
			Content: fmt.Sprintf(
				"Generate three exercises  for a user with the following health conditions: %v.",
				healthConditionNames,
			),
		},
	}

	resp, err := openAI.CreateChatCompletion(context.Background(), openai.ChatCompletionRequest{
		Model:    openai.GPT4oMini,
		Messages: messages,
	})

	if err != nil {
		return exercisePlans, err
	}

	contentStr := resp.Choices[0].Message.Content

	// Parse the JSON string into a slice of Meal
	var exercises []models.Exercise
	err = json.Unmarshal([]byte(contentStr), &exercises)
	if err != nil {
		return nil, fmt.Errorf("error unmarshalling JSON: %v", err)
	}

	// Convert meals to Diet
	for _, exercise := range exercises {
		prompt := fmt.Sprintf("A man or a woman perform the exercise called %s with a nice background", exercise.Name)

		mealPlan := models.Exercise{
			UserID:        uint(userID),
			Name:          exercise.Name,
			Instructions:  exercise.Instructions, // Generate meal image using DALL-E
			TotalDuration: exercise.TotalDuration,
			Photo:         generateMealImage(prompt, exercise.Name, openAI),
			CreatedAt:     startDate,
		}
		db.Create(&mealPlan)
		exercisePlans = append(exercisePlans, mealPlan)
	}

	return exercisePlans, nil
}

func generateExerciseForUser(userID int, db *gorm.DB, openAI *openai.Client) error {
	currentDate := time.Now()
	// Check if meals already exist for the user for the current day
	var existingExercise models.Exercise
	db.Where("user_id = ? AND DATE(created_at) = ?", userID, currentDate.Format("2006-01-02")).Find(&existingExercise)

	if existingExercise.ID != 0 {
		return errors.New("exercise already exist for today")
	}

	exercisePlans, err := generateExerciseForHealthCondition(userID, db, openAI, time.Now())
	if err != nil {
		fmt.Println(err.Error())
		return errors.New("failed to generate exercise plans")
	}

	// Save each meal plan to the database
	for _, exercise := range exercisePlans {
		if err := db.Create(&exercise).Error; err != nil {
			return errors.New("failed to save meal")
		}
	}

	return nil

}

func fetchThreeDayMeals(userID int, db *gorm.DB, openai *openai.Client, startDate time.Time) ([]DailyMeals, error) {
	var dailyMealPlans []DailyMeals

	formattedDate := startDate.Format("2006-01-02")

	mealsForDay := []models.Diet{}

	var existingMeal []models.Diet
	result := db.Where("user_id = ? AND DATE(created_at) = ?", userID, formattedDate).Limit(3).Find(&existingMeal)

	if result.Error != nil {
		return nil, result.Error
	}

	if len(existingMeal) == 3 {
		mealsForDay = append(mealsForDay, existingMeal...)
	} else {
		newMeals, err := generateThreeMealsForHealthConditionAndAllergies(userID, db, openai, startDate)
		if err != nil {
			return nil, err
		}

		mealsForDay = append(mealsForDay, newMeals...)
	}

	dailyMealPlans = append(dailyMealPlans, DailyMeals{
		Date:  formattedDate,
		Meals: mealsForDay,
	})

	return dailyMealPlans, nil
}

func fetchThreeDayExercise(userID int, db *gorm.DB, openai *openai.Client, startDate time.Time) ([]DailyExercise, error) {
	var dailyExercisePlans []DailyExercise

	formattedDate := startDate.Format("2006-01-02")

	exercisesForDay := []models.Exercise{}

	var existingExercise []models.Exercise
	result := db.Where("user_id = ? AND DATE(created_at) = ?", userID, formattedDate).Limit(3).Preload("Instructions").Find(&existingExercise)

	if result.Error != nil {
		return nil, result.Error
	}

	if len(existingExercise) == 3 {
		exercisesForDay = append(exercisesForDay, existingExercise...)
	} else {
		newMeals, err := generateExerciseForHealthCondition(userID, db, openai, startDate)
		if err != nil {
			return nil, err
		}

		exercisesForDay = append(exercisesForDay, newMeals...)
	}

	dailyExercisePlans = append(dailyExercisePlans, DailyExercise{
		Date:     formattedDate,
		Exercise: exercisesForDay,
	})

	return dailyExercisePlans, nil
}

func (u FitnessApp) GenerateDiet(userID int, startDate time.Time) ([]DailyMeals, error) {
	response, err := fetchThreeDayMeals(userID, u.DB, u.OpenAiClient, startDate)

	return response, err
}

func (u FitnessApp) GenerateExercise(userID int, startDate time.Time) ([]DailyExercise, error) {
	response, err := fetchThreeDayExercise(userID, u.DB, u.OpenAiClient, startDate)

	return response, err
}

func (u FitnessApp) ToggleInstructionCompletion(instructionID uint) error {
	var instruction models.ExerciseInstruction

	if err := u.DB.First(&instruction, instructionID).Error; err != nil {
		return errors.New("instruction not found")
	}

	instruction.IsCompleted = !instruction.IsCompleted

	if err := u.DB.Save(&instruction).Error; err != nil {
		return errors.New("failed to update instruction status")
	}

	return nil
}

func (u FitnessApp) ToggleAllInstructionCompletion(exerciseID uint) error {
	var instructions []models.ExerciseInstruction
	if err := u.DB.Where("exercise_id = ?", exerciseID).Find(&instructions).Error; err != nil {
		return errors.New("no instructions found for the given exercise")
	}

	for i := range instructions {
		instructions[i].IsCompleted = !instructions[i].IsCompleted
	}

	if err := u.DB.Save(&instructions).Error; err != nil {
		return errors.New("failed to update instruction statuses")
	}

	return nil
}

func (u FitnessApp) ToggleDietCompletion(userID, dietID uint) error {
	var diet models.Diet

	if err := u.DB.Where("user_id = ?", userID).First(&diet, dietID).Error; err != nil {
		return errors.New("diet not found")
	}

	diet.IsCompleted = !diet.IsCompleted

	if err := u.DB.Save(&diet).Error; err != nil {
		return errors.New("failed to update diet status")
	}

	return nil

}
