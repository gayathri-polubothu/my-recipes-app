# My Recipes Application with MERN stack

## Description
This is a sample Recipes application which uses MongoDB, Express, React JS with Material UI and NodeJS.
With this application users can do the following features
> User Registration,
> User Login,
> All Recipes(Home page),
> Create Recipe,
> Favorite Recipe,
> Logout

## Setup
Clone the repository and install the dependencies with 'yarn install' | 'npm install'

## ENV Configuration
Create .env file in project root directory and set the following variables 
> MONGODB_USERNAME
> MONGODB_PASSWORD
> PRIVATE_SECRET_KEY
> SERVER_PORT = 3040

## Run

Run the server with node server/src/index.js or run the script: server:start in package.json

Run the client with package script: start:dev in package.json

## Build

Build both client and server with the package script "build:prod" in package.json file


### Other

The server is reachable at port 3040. If you used start:dev, you should use localhost:8080 for hot rerload.

To login you can user the following credentials:

> username: gayathri,
> password: gayathri123
