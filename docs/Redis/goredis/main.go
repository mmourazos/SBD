package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

func main() {
	godotenv.Load()

	password := os.Getenv("REDIS_PASSWORD")
	url := os.Getenv("REDIS_URL")
	// db := os.Getenv("DB_NAME")
	duration, _ := time.ParseDuration("10s")

	client := redis.NewClient(&redis.Options{
		Addr:        url,
		Password:    password,
		DB:          0,
		DialTimeout: duration,
	})

	ctx := context.Background()
	err := client.Set(ctx, "foo", "barr", 0).Err()
	if err != nil {
		panic(err)
	}
	val, err := client.Get(ctx, "foo").Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("foo:", val)
}
