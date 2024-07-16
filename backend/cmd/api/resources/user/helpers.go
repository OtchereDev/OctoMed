package user

import (
	"errors"
	"math/rand"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var letterRunes = []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890asdfghjklqwertyuiozxcvbnm@")

func HashPassword(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
}

func CompareUserPassword(password string, userPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(userPassword), []byte(password))
}

func GenerateJWT(u JwtPayload) (string, error) {
	accessUserClaims := jwt.MapClaims{
		"name":    u.Name,
		"email":   u.Email,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
		"role":    u.UserType,
		"user_id": u.UserID,
	}

	at := jwt.NewWithClaims(jwt.SigningMethodHS512, accessUserClaims)

	a_t, err := at.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		return "", errors.New("error generating users jwt access")
	}

	return a_t, nil
}

func GenerateCode(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
