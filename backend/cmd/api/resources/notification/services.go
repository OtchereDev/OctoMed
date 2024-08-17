package notification

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func SendEmail(emailType string, data any) bool {
	postBody, error := json.Marshal(data)

	if error != nil {
		fmt.Println(error.Error())
	}

	Responsebody := bytes.NewBuffer(postBody)

	client := &http.Client{}

	req, err := http.NewRequest(http.MethodPost, fmt.Sprintf("http://%s:%s/send/%s", os.Getenv("NODE_APP_HOST"), os.Getenv("MAILING_SERVICE"), emailType), Responsebody)
	req.Header.Add("Content-Type", "application/json")

	if err != nil {
		return false
	}

	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("Entered", err)
		return false
	}
	defer resp.Body.Close()

	fmt.Println("status", resp.StatusCode)

	if resp.StatusCode == 200 {
		var cResp any

		if err := json.NewDecoder(resp.Body).Decode(&cResp); err != nil {
			// TODO: write to logger
			fmt.Println(cResp)
		}
		return true
	} else {
		var cResp any

		if err := json.NewDecoder(resp.Body).Decode(&cResp); err != nil {
			// TODO: write to logger
			fmt.Println(cResp)
		}
		return false
	}
}

func SendForgotPassword(name string, email string, verifylink string) bool {
	data := ForgotPasswordData{
		Name:  name,
		Link:  verifylink,
		Email: email,
	}
	response := SendEmail("forgot-password", data)

	return response
}
