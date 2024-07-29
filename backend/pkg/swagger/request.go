package swagger

type SignupDTO struct {
	FullName    string `json:"full_name" validate:"required"`
	Email       string `json:"email" validate:"email"`
	Password    string `json:"password,omitempty" validate:"required"`
	PhoneNumber string `json:"phone_number" validate:"required,e164"`
	DOB         string `json:"dob" validate:"required"`
}

type LoginRequestPayload struct {
	Email    string `json:"email" validate:"email,required"`
	Password string `json:"password"`
}

type BioDataPayload struct {
	Weight       int    `json:"weight" validate:"number"`
	WeightMetric string `json:"weight_metric"`
	Height       int    `json:"height" validate:"number"`
	HeightMetric string `json:"height_metric"`
	Avatar       string `json:"avatar"`
}

type CreateAllergyPayloady struct {
	Allergy string `json:"allergy"`
}

type CreateHealthCondition struct {
	HealthCondition string `json:"health_condition"`
}

type LocationPayload struct {
	Country     string `json:"country" validate:"required"`
	Region      string `json:"region" validate:"required"`
	City        string `json:"city"`
	Street      string `json:"street"`
	Name        string `json:"name" validate:"required"`
	PhoneNumber string `json:"phone_number" validate:"required,e164"`
}

type HealthConditionPayload struct {
	HealthConditions       []int `json:"health_conditions"`
	Allergies              []int `json:"allergies"`
	RemoveHealthConditions []int `json:"remove_health_conditions"`
	RemoveAllergies        []int `json:"remove_allergies"`
}
