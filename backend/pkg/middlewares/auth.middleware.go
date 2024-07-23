package middlewares

import (
	"errors"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type Config struct {
	Filter       func(c *fiber.Ctx) bool
	Unauthorized fiber.Handler
	Secret       string
	Decode       func(c *fiber.Ctx) (*jwt.MapClaims, error)
}

var DefaultConfig = Config{
	Filter:       nil,
	Unauthorized: nil,
	Secret:       "TestSenior",
	Decode:       nil,
}

func configDefault(config ...Config) Config {
	if len(config) < 1 {
		return DefaultConfig
	}

	cfg := config[0]

	if cfg.Filter == nil {
		cfg.Filter = DefaultConfig.Filter
	}

	if strings.Trim(cfg.Secret, " ") == "" {
		cfg.Secret = os.Getenv("JWT_SECRET")
	}

	if cfg.Decode == nil {
		cfg.Decode = func(c *fiber.Ctx) (*jwt.MapClaims, error) {
			authHeaders := c.Get("Authorization")

			if authHeaders == "" {
				return nil, errors.New("authorization Headers not provided")
			}

			token, err := jwt.Parse(strings.Split(authHeaders, " ")[1], func(t *jwt.Token) (interface{}, error) {

				if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing error: %v", t.Header["alg"])
				}
				return []byte(cfg.Secret), nil
			})

			// fmt.Println("xxxx auth:", err)
			if err != nil {
				return nil, errors.New("invalid Token")
			}

			claim, ok := token.Claims.(jwt.MapClaims)

			if !(ok && token.Valid) {
				return nil, errors.New("invalid Token")
			}

			if expireAt, ok := claim["exp"]; ok && int64(expireAt.(float64)) < time.Now().UTC().Unix() {
				return nil, errors.New("token is expired")
			}

			return &claim, nil

		}
	}

	if cfg.Unauthorized == nil {
		cfg.Unauthorized = func(c *fiber.Ctx) error {
			return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{"status": fiber.StatusUnauthorized, "data": &fiber.Map{"message": "Unauthorized"}})
		}
	}

	return cfg
}

func New(config Config) fiber.Handler {
	cfg := configDefault(config)

	return func(c *fiber.Ctx) error {
		if cfg.Filter != nil && cfg.Filter(c) {
			fmt.Println("AuthMiddleware skipped")
		}

		claims, err := cfg.Decode(c)

		if err == nil {
			c.Locals("user", claims)
			return c.Next()
		}

		return cfg.Unauthorized(c)
	}
}

var AuthMiddleware func(*fiber.Ctx) error

func SetupMiddleAuthMiddleware() {
	AuthMiddleware = New(Config{Secret: os.Getenv("JWT_SECRET")})
}
