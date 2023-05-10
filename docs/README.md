# 1001 reasons why you will have a good day!

## Introduction
Welcome to the "1001 reasons why you will have a good day" API! This API provides access to a collection of motivational quotes to help brighten your day. The API has the following endpoints: GET, PUT, PATCH, POST, and DELETE.

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
            "id": 1,
            "body": "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            "author": "Nelson Mandela",
            "dateAdded": "2023-05-10T14:13:38.567Z"

        },
        {
            "id": 2,
            "body": "Believe you can and you're halfway there.",
            "author": "Theodore Roosevelt",
            "dateAdded": "2023-05-10T14:13:38.567Z"
        },
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
    "id": 1,
    "body": "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "author": "Nelson Mandela",
    "dateAdded": "2022-02-01"
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
