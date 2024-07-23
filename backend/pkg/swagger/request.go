package swagger

type SignupDTO struct {
	FullName    string `json:"full_name" validate:"required"`
	Email       string `json:"email" validate:"email"`
	PhoneNumber string `json:"phone_number" validate:"required,e164"`
	Password    string `json:"password,omitempty" validate:"required"`
	DOB         string `json:"dob" validate:"required"`
}

type LoginRequestPayload struct {
	Email    string `json:"email" validate:"email,required"`
	Password string `json:"password"`
}
