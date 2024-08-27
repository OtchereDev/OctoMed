package metric

import (
	"time"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"gorm.io/gorm"
)

func (s *MetricApp) CreatePulse(userID uint, reading int) (*models.Pulse, error) {
	pulse := &models.Pulse{
		UserID:  userID,
		Reading: reading,
	}
	if err := s.DB.Create(pulse).Error; err != nil {
		return nil, err
	}
	return pulse, nil
}

func (s *MetricApp) CreateHeartBeat(userID uint, reading int) (*models.HeartBeat, error) {
	heartBeat := &models.HeartBeat{
		UserID:  userID,
		Reading: reading,
	}
	if err := s.DB.Create(heartBeat).Error; err != nil {
		return nil, err
	}
	return heartBeat, nil
}

func (s *MetricApp) CreateBloodPressure(userID uint, systolic, diastolic int) (*models.BloodPressure, error) {
	bloodPressure := &models.BloodPressure{
		UserID:    userID,
		Systolic:  systolic,
		Diastolic: diastolic,
	}
	if err := s.DB.Create(bloodPressure).Error; err != nil {
		return nil, err
	}
	return bloodPressure, nil
}

func (s *MetricApp) CreateBloodGlucose(userID uint, reading int) (*models.BloodGlucose, error) {
	bloodGlucose := &models.BloodGlucose{
		UserID:  userID,
		Reading: reading,
	}
	if err := s.DB.Create(bloodGlucose).Error; err != nil {
		return nil, err
	}
	return bloodGlucose, nil
}

func (s *MetricApp) CreateSleepPattern(userID uint, startHour, endHour int) (*models.SleepPattern, error) {
	sleepPattern := &models.SleepPattern{
		UserID:    userID,
		StartHour: startHour,
		EndHour:   endHour,
	}
	if err := s.DB.Create(sleepPattern).Error; err != nil {
		return nil, err
	}
	return sleepPattern, nil
}

func (s *MetricApp) CreateWeight(userID uint, reading int) (*models.Weight, error) {
	weight := &models.Weight{
		UserID:  userID,
		Reading: reading,
	}
	if err := s.DB.Create(weight).Error; err != nil {
		return nil, err
	}
	return weight, nil
}

func (s *MetricApp) CreateHeight(userID uint, reading int) (*models.Height, error) {
	height := &models.Height{
		UserID:  userID,
		Reading: reading,
	}
	if err := s.DB.Create(height).Error; err != nil {
		return nil, err
	}
	return height, nil
}

func (s *MetricApp) UpdatePulse(userID, pulseID uint, reading int) (*models.Pulse, error) {
	var pulse models.Pulse
	if err := s.DB.First(&pulse, "id = ? AND user_id = ?", pulseID, userID).Error; err != nil {
		return nil, err
	}

	pulse.Reading = reading

	if err := s.DB.Save(&pulse).Error; err != nil {
		return nil, err
	}
	return &pulse, nil
}

func (s *MetricApp) UpdateHeartBeat(userID, heartBeatID uint, reading int) (*models.HeartBeat, error) {
	var heartBeat models.HeartBeat
	if err := s.DB.First(&heartBeat, "id = ? AND user_id = ?", heartBeatID, userID).Error; err != nil {
		return nil, err
	}

	heartBeat.Reading = reading

	if err := s.DB.Save(&heartBeat).Error; err != nil {
		return nil, err
	}
	return &heartBeat, nil
}

func (s *MetricApp) UpdateBloodPressure(userID, bloodPressureID uint, systolic, diastolic int) (*models.BloodPressure, error) {
	var bloodPressure models.BloodPressure
	if err := s.DB.First(&bloodPressure, "id = ? AND user_id = ?", bloodPressureID, userID).Error; err != nil {
		return nil, err
	}

	bloodPressure.Systolic = systolic
	bloodPressure.Diastolic = diastolic

	if err := s.DB.Save(&bloodPressure).Error; err != nil {
		return nil, err
	}
	return &bloodPressure, nil
}

func (s *MetricApp) UpdateBloodGlucose(userID, glucoseID uint, reading int) (*models.BloodGlucose, error) {
	var bloodGlucose models.BloodGlucose
	if err := s.DB.First(&bloodGlucose, "id = ? AND user_id = ?", glucoseID, userID).Error; err != nil {
		return nil, err
	}

	bloodGlucose.Reading = reading

	if err := s.DB.Save(&bloodGlucose).Error; err != nil {
		return nil, err
	}
	return &bloodGlucose, nil
}

func (s *MetricApp) UpdateSleepPattern(userID, sleepPatternID uint, startHour, endHour int) (*models.SleepPattern, error) {
	var sleepPattern models.SleepPattern
	if err := s.DB.First(&sleepPattern, "id = ? AND user_id = ?", sleepPatternID, userID).Error; err != nil {
		return nil, err
	}

	sleepPattern.StartHour = startHour
	sleepPattern.EndHour = endHour

	if err := s.DB.Save(&sleepPattern).Error; err != nil {
		return nil, err
	}
	return &sleepPattern, nil
}

func (s *MetricApp) UpdateWeight(userID, weightID uint, reading int) (*models.Weight, error) {
	var weight models.Weight
	if err := s.DB.First(&weight, "id = ? AND user_id = ?", weightID, userID).Error; err != nil {
		return nil, err
	}

	weight.Reading = reading

	if err := s.DB.Save(&weight).Error; err != nil {
		return nil, err
	}
	return &weight, nil
}

func (s *MetricApp) UpdateHeight(userID, heightID uint, reading int) (*models.Height, error) {
	var height models.Height
	if err := s.DB.First(&height, "id = ? AND user_id = ?", heightID, userID).Error; err != nil {
		return nil, err
	}

	height.Reading = reading

	if err := s.DB.Save(&height).Error; err != nil {
		return nil, err
	}
	return &height, nil
}

func (s *MetricApp) DeletePulse(userID uint, pulseID uint) error {
	if err := s.DB.Where("user_id = ? AND id = ?", userID, pulseID).Delete(&models.Pulse{}).Error; err != nil {
		return err
	}
	return nil
}

func (s *MetricApp) DeleteHeartBeat(userID uint, heartBeatID uint) error {
	if err := s.DB.Where("user_id = ? AND id = ?", userID, heartBeatID).Delete(&models.HeartBeat{}).Error; err != nil {
		return err
	}
	return nil
}

func (s *MetricApp) DeleteBloodPressure(userID uint, bloodPressureID uint) error {
	if err := s.DB.Where("user_id = ? AND id = ?", userID, bloodPressureID).Delete(&models.BloodPressure{}).Error; err != nil {
		return err
	}
	return nil
}

func (s *MetricApp) DeleteBloodGlucose(userID uint, bloodGlucoseID uint) error {
	if err := s.DB.Where("user_id = ? AND id = ?", userID, bloodGlucoseID).Delete(&models.BloodGlucose{}).Error; err != nil {
		return err
	}
	return nil
}

func (s *MetricApp) DeleteSleepPattern(userID uint, sleepPatternID uint) error {
	if err := s.DB.Where("user_id = ? AND id = ?", userID, sleepPatternID).Delete(&models.SleepPattern{}).Error; err != nil {
		return err
	}
	return nil
}

func (s *MetricApp) DeleteWeight(userID uint, weightID uint) error {
	if err := s.DB.Where("user_id = ? AND id = ?", userID, weightID).Delete(&models.Weight{}).Error; err != nil {
		return err
	}
	return nil
}

func (s *MetricApp) DeleteHeight(userID uint, heightID uint) error {
	if err := s.DB.Where("user_id = ? AND id = ?", userID, heightID).Delete(&models.Height{}).Error; err != nil {
		return err
	}
	return nil
}

func (s *MetricApp) GetPulseByDateRange(userID uint, startDate, endDate time.Time) ([]models.Pulse, error) {
	var pulses []models.Pulse
	if err := s.DB.Where("user_id = ? AND created_at BETWEEN ? AND ?", userID, startDate, endDate).Find(&pulses).Error; err != nil {
		return nil, err
	}
	return pulses, nil
}

func (s *MetricApp) GetHeartBeatByDateRange(userID uint, startDate, endDate time.Time) ([]models.HeartBeat, error) {
	var heartBeats []models.HeartBeat
	if err := s.DB.Where("user_id = ? AND created_at BETWEEN ? AND ?", userID, startDate, endDate).Find(&heartBeats).Error; err != nil {
		return nil, err
	}
	return heartBeats, nil
}

func (s *MetricApp) GetBloodPressureByDateRange(userID uint, startDate, endDate time.Time) ([]models.BloodPressure, error) {
	var bloodPressures []models.BloodPressure
	if err := s.DB.Where("user_id = ? AND created_at BETWEEN ? AND ?", userID, startDate, endDate).Find(&bloodPressures).Error; err != nil {
		return nil, err
	}
	return bloodPressures, nil
}

func (s *MetricApp) GetBloodGlucoseByDateRange(userID uint, startDate, endDate time.Time) ([]models.BloodGlucose, error) {
	var bloodGlucoses []models.BloodGlucose
	if err := s.DB.Where("user_id = ? AND created_at BETWEEN ? AND ?", userID, startDate, endDate).Find(&bloodGlucoses).Error; err != nil {
		return nil, err
	}
	return bloodGlucoses, nil
}

func (s *MetricApp) GetSleepPatternByDateRange(userID uint, startDate, endDate time.Time) ([]models.SleepPattern, error) {
	var sleepPatterns []models.SleepPattern
	if err := s.DB.Where("user_id = ? AND created_at BETWEEN ? AND ?", userID, startDate, endDate).Find(&sleepPatterns).Error; err != nil {
		return nil, err
	}
	return sleepPatterns, nil
}

func (s *MetricApp) GetWeightByDateRange(userID uint, startDate, endDate time.Time) ([]models.Weight, error) {
	var weights []models.Weight
	if err := s.DB.Where("user_id = ? AND created_at BETWEEN ? AND ?", userID, startDate, endDate).Find(&weights).Error; err != nil {
		return nil, err
	}
	return weights, nil
}

func (s *MetricApp) GetHeightByDateRange(userID uint, startDate, endDate time.Time) ([]models.Height, error) {
	var heights []models.Height
	if err := s.DB.Where("user_id = ? AND created_at BETWEEN ? AND ?", userID, startDate, endDate).Find(&heights).Error; err != nil {
		return nil, err
	}
	return heights, nil
}

func GetLastPulse(userID uint, DB *gorm.DB) (models.Pulse, error) {
	var pulse models.Pulse
	if err := DB.Where("user_id = ?", userID).Order("created_at desc").First(&pulse).Error; err != nil {
		return pulse, err
	}
	return pulse, nil
}

func GetLastBloodPressure(userID uint, DB *gorm.DB) (models.BloodPressure, error) {
	var bloodPressure models.BloodPressure
	if err := DB.Where("user_id = ?", userID).Order("created_at desc").First(&bloodPressure).Error; err != nil {
		return bloodPressure, err
	}
	return bloodPressure, nil
}

func GetLastBloodGlucose(userID uint, DB *gorm.DB) (models.BloodGlucose, error) {
	var bloodGlucose models.BloodGlucose
	if err := DB.Where("user_id = ?", userID).Order("created_at desc").First(&bloodGlucose).Error; err != nil {
		return bloodGlucose, err
	}
	return bloodGlucose, nil
}

func GetLastSleepPattern(userID uint, DB *gorm.DB) (models.SleepPattern, error) {
	var sleepPattern models.SleepPattern
	if err := DB.Where("user_id = ?", userID).Order("created_at desc").First(&sleepPattern).Error; err != nil {
		return sleepPattern, err
	}
	return sleepPattern, nil
}

func GetLastWeight(userID uint, DB *gorm.DB) (models.Weight, error) {
	var weight models.Weight
	if err := DB.Where("user_id = ?", userID).Order("created_at desc").First(&weight).Error; err != nil {
		return weight, err
	}
	return weight, nil
}

func GetLastHeight(userID uint, DB *gorm.DB) (models.Height, error) {
	var height models.Height
	if err := DB.Where("user_id = ?", userID).Order("created_at desc").First(&height).Error; err != nil {
		return height, err
	}
	return height, nil
}
