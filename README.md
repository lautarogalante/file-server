# File Server

## This is an application for uploading files to a specific hard disk in a server, and download them to your local machine.

When downloading multiples files or directories this functionality compress the data in a **.zip** file and send to the client.

This application consists of a client in React and a backend in Go that performs all operations on the running server.

#### Content

- [Clone this repository](#clone)
- [Run in your local machine](#run-in-your-local-machine)
  - [Export environment variables](#export-environment-variables)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Run using Docker](#run-using-docker)

## Clone

Clone the project, and cd into the folder:
```bash
git clone http://github.com/lautarogalante/file-server.git
cd file-server
```
### Run in your local machine

### Export environment variables

In order for the project to access the environment variables, whether you build it locally or using docker, you must add the following environment variables in your **.bashrc** or **.profile**.

In the **STORAGE_PATH** variable you most define the name between slashes where the volume is to be mounted
defined in **LOCAL_PATH**.

example: 
```bash 
export HOST_URL=http://your-ip-address
export SERVER_PORT=8080
export CLIENT_PORT=8081
export STORAGE_PATH=/storage/ 
export LOCAL_PATH=/home/your-user
```

#### Backend

Install the dependencies and run the server:
```bash
cd server
go build .
./main
```
  or

```bash
cd server
go run .
```

#### Frontend

Install the dependencies:
```bash
cd client
npm install
```

Run in dev mode:
```bash
npm run dev
```

### Run using Docker
Inside into directory project **/file-server** and run:

for build the docker image:
```bash
docker compose build
```
and run it:
```bash
docker compose up
```

The client app will be available at **HOST_URL:CLIENT_PORT**
