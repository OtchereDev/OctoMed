package validate

import (
	"github.com/go-playground/validator/v10"
)

func SerializeErrors(validationErr error) map[string]string {
	var errorResponse = make(map[string]string)

	for _, err := range validationErr.(validator.ValidationErrors) {
		errorResponse[err.Field()] = err.Error()
	}

	return errorResponse

}
