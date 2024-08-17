package notification

type VerifyAccountData struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Link  string `json:"link"`
}

type ForgotPasswordData struct {
	Email string `json:"email"`
	Link  string `json:"link"`
	Name  string `json:"name"`
}
