package validate

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

func SerializeErrors(validationErr error) map[string]string {

	var errorResponse = make(map[string]string)

	for _, err := range validationErr.(validator.ValidationErrors) {
		fmt.Println(err.Field(), err.Tag(), err.Error(), err.ActualTag())

		errorResponse[err.Field()] = err.Error()
	}

	return errorResponse

}
