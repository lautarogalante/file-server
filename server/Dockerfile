FROM golang:1.21 AS builder

WORKDIR /usr/src/app/server

COPY ["go.mod", "go.sum", "./"]
RUN go mod download

COPY . .

RUN  CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates

WORKDIR /
COPY --from=builder /usr/src/app/server/main .

CMD ["./main"]