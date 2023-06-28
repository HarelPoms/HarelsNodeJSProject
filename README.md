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

- Must provide token of a logged in admin user to get an answer from this api

#### Get a specific user

```bash http 
    GET /api/users/:id
```

Request:
- Must include valid id param of requested user
- Must provide token of an admin user or the user himself to get an answer from this api

#### Register a user

```bash http 
    POST /api/users/
```

Request:
- Body must include bare minimum template for user creation, optionals non-withstanding, example :
``` bash 
{
    "name": {
      "first": "Hank",
      "last": "Fireant"
    },
    "phone": "0500000000",
    "email": "hank@gmail.com", 
    "password": "Aa123456!",
    "address": {
      "country": "NL",
      "city": "Amsterdam",
      "street": "Merchant Coast",
      "houseNumber": 255
    },"isBusiness": true
}

name (object containing):
    first 
        -- string
        -- required
        -- min 2
        -- max 256
    middle
        -- optional 
        -- string
        -- max 256
    last
        -- string
        -- required
        -- min 2
        -- max 256
phone 
    -- string
    -- required
    -- expects a valid phone number, in the format of a '0' followed by 1 or 2 digits, followed by an optional hyphen/whitespace, then 3 digits, then an optional white space, followed by 4 digits.
email
    -- string
    -- required
    -- must be unique
    -- must be lowercase
    -- must match the pattern of an email address, for instance bob@ross.com
password
    -- string
    -- required
    -- must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and is at least 8 characters long.
image (optional object which if added must contain):
    URL : 
        --  string
        --  optional
        --  if included must be a valid URL address.
    alt : 
        -- string
        -- required
        -- min 2
        -- max 256
address (object containing) :
    state :
        -- optional 
        -- string
        -- max 256
    country :   
        -- string
        -- required
        -- min 2
        -- max 256
    city :  
        -- string
        -- required
        -- min 2
        -- max 256
    street : 
        -- string
        -- required
        -- min 2
        -- max 256
    houseNumber :
        -- Number
        -- required
        -- minLength 1
    zip :
        -- Number
        -- Optional
        -- minLength 4
    isAdmin :
        -- Boolean
        -- Optional
    isBusiness :
        -- Boolean
        -- Optional
```









