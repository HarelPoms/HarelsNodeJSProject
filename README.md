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

#### Login a user

```bash http 
    POST /api/users/login
```

``` bash 
Request:
- Body must include existing user email and correct password, example :
{
    "email":"kenny@gmail.com",
    "password":"Aa123456@"
}
- If the password is wrong for the same user 3 times in a row, the user will be locked out for 24 hours.
```

#### Edit a user

```bash http 
    PUT /api/users/:id
```

``` bash 
Request:
- id must be a valid user id
- Body may include all of the details to be updated the way an exhaustive profile update would occur
  but minimally all that is needed for a barebones update is the updated address of the user and his isBusiness value, example :
{
    "name": {
      "first": "kenny",
      "last": "mc"
    },
    "phone": "0500000000",
    "email": "kenny@gmail.com",
    "password": "Aa123456!",
    "address": {
      "country": "Israel",
      "city": "Ashkeluna",
      "street": "Victory Square 2",
      "houseNumber": 255
    },
    "isAdmin": true,
    "isBusiness": false
  }
- Note that from this entire example, only isBusiness and address as they are shown are required, all of the other details both in the example and in the exhaustive description found in the register api are entirely optional here.
-- A token must be attached to the header
-- The token must involve the user whose profile is being edited in the request.
```

#### Change a users business status

```bash http 
    PATCH /api/users/:id
```

```bash 
    Request: 
    -- The id must be a valid user id
    -- A token must be attached to the header
    -- The token must involve the user whose business status is to be updated.
```

#### Delete a user

```bash http 
    DELETE /api/users/:id
```

```bash 
    Request: 
    -- The id must be a valid user id
    -- A token must be attached to the header
    -- The token must involve an admin, only an admin may delete a user.
```













