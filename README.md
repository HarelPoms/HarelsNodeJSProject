# NodeJS Final Project Documentation

## Libraries Used : Express, joi, jsonwebtoken, lodash, mongoose, morgan, ioredis, cross-env, cors, config, chalk version 4.1.1, nodemon.

# Getting Started with node server App

## Installation

Enter to the server folder

```bash
cd Harels_NodeJS_Project
```

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the node server in production mode
- The server will not reload if you make edits.
- The print at the terminal will be:

`Connection string mongodb+srv://Admin:Aa123456!@hackerucluster.cd0j0s0.mongodb.net/NodeJSFinalProjectDB` (in yellow)
`Server running on http://localhost:8181/` (in blue)


### `npm run dev`

- Runs the server with nodemon
- The server will reload if you make edits
- The print at the terminal will be:

`Connection string mongodb://127.0.0.1:27017/NodeJSFinalProjectDB` (in yellow)
`Server running on http://localhost:8181/` (in blue)

And if there are no connection errors to the database you should see the message in cyan:

`connected to mongo`

### Available Routes

#### Get all users

```bash http 
    GET /api/users/
```

Request:

- Must provide token of an admin user to get an answer from this api


