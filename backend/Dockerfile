FROM golang:1.22

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main ./cmd/api/main.go

# Expose port 4000 to the outside world
EXPOSE 4000

CMD ["./main", "-addr", "0.0.0.0:4000"]
