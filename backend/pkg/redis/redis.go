package redis

import (
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

func SetupRedis() *redis.Client {
	RedisURL := os.Getenv("REDIS_URL")

	if RedisURL == "" {
		log.Println("SERVER: Redis URL not provided")
		return nil
	}

	client := redis.NewClient(&redis.Options{
		Addr:     RedisURL,
		Password: "",
		DB:       0,
	})

	log.Println("SERVER: Connected to REDIS")

	return client

}
