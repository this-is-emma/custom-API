# 1001 reasons why you will have a good day!

## Introduction
Welcome to the "1001 reasons why you will have a good day" API! This API provides access to a collection of motivational quotes to help brighten your day. The API has the following endpoints: GET, PUT, PATCH, POST, and DELETE.

## Authentication 
This API requires authentication.  It includes the following endpoints:

## Authentication API

The Authentication API is responsible for user authentication and session management. It includes the following endpoints:

### Sign-Up

This endpoint is used to create a new user account.

#### Endpoint URL

```
POST /sign-up
```

#### Request Body

The request body should contain the user's information:

| Parameter     | Type   | Required | Description                           |
| ------------- | ------ | -------- | ------------------------------------- |
| `username`    | string | Yes      | The user's username (must be unique). |
| `password`    | string | Yes      | The user's password.                  |


#### Response

If the request is successful, the server will respond with an HTTP 201 status code and a JSON object:

```
HTTP/1.1 201 Created
Content-Type: application/json

{
    "message": 'New user created'
}
```

### Login

This endpoint is used to authenticate a user and generate a session token. The session token is required for accessing protected resources on the server.

#### Endpoint URL

```
POST /login
```

#### Request Body

The request body should contain the user's credentials:

| Parameter   | Type   | Required | Description                     |
| ----------- | ------ | -------- | ------------------------------- |
| `username`  | string | Yes      | The user's username.            |
| `password`  | string | Yes      | The user's password.            |

#### Response

If the credentials are valid, the server will respond with an HTTP 200 status code and a JSON object:

```
HTTP/1.1 200 OK
Content-Type: application/json

{
   "message": 'You are now logged in!' 
}
```

If the credentials are invalid, the server will respond with an HTTP 401 status code and an error message:

```
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Wrong Username or password"
}
```

### Logout

This endpoint is used to invalidate a session token and log out a user.

#### Endpoint URL

```
POST /logout
```

#### Response

If the session token is valid, the server will respond with an HTTP 200 status code and a success message:

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "user logged out"
}
```


## Endpoints

### GET /index
Returns a list of all available quotes.

#### Response
```
Status code: 200 OK
Content-Type: application/json

{
    [
        {
            "_id": "645ba2f3eb235a7afc00f21a",
            "body": "'You miss 100% of the chances you don't take' -Wayne Gretzky",
            "author": "Michael Scott",
            "dateAdded": "2023-05-10T13:58:11.642Z",
            "__v": 0
        },
        {
            "_id": "645c749f3c96321e7e9e1a5a",
            "body": "It has an oaky afterbirth",
            "author": "Michael Scott",
            "dateAdded": "2023-05-11T04:52:47.038Z",
            "__v": 0
        }
        ...
    ]
}
```

### GET /index/{id}
Returns a single quote by ID.

#### Response
```
Status code: 200 OK
Content-Type: application/json

{
    "_id": "645ba2f3eb235a7afc00f21a",
    "body": "'You miss 100% of the chances you don't take' -Wayne Gretzky",
    "author": "Michael Scott",
    "dateAdded": "2023-05-10T13:58:11.642Z",
    "__v": 0
}
```

#### Error Responses
```
Status code: 404 Not Found
Content-Type: application/json

{
    "error": "Quote with id 1 not found."
}
```

### PUT /index/{id}
Updates a quote by ID.

#### Request Body
```
Content-Type: application/json

{
    "body": "New quote content",
    "author": "New quote author"
}
```

#### Response
```
Status code: 200 OK
Content-Type: application/json

{
    "id": 1,
    "text": "New quote text",
    "author": "New quote author"
}

```

#### Error Responses
```
Status code: 404 Not Found
Content-Type: application/json

{
    "error": "Cannot find quote"
}
```

### PATCH /index/{id}
Updates a quote by ID.

#### Request Body
```
Content-Type: application/json

{
    "body": "New quote content",
}
```

#### Response
```
Status code: 200 OK
Content-Type: application/json

{
    "id": 1,
    "text": "New quote text",
    "author": "quote author"
}

```

#### Error Responses
```
Status code: 400 
Content-Type: application/json

{
    "error": "Cannot find quote"
}
```


### POST /quotes
Creates a new quote.

#### Request Body
```
Content-Type: application/json

{
    "body": "Quote text",
    "author": "Quote author"
}
```

#### Response
```
Status code: 201 Created
Content-Type: application/json

{

    "id": 1002,
    "body": "Quote text",
    "author": "Quote author"
    
}
```

### DELETE /quotes/{id}
Deletes a quote by ID.

#### Response
```
{
    message: "deleted quote"
}
```

#### Error Responses
```
Status code: 404 Not Found
Content-Type: application/json

{
    "error": "Cannot find quote"
}
```
