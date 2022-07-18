# caps_m4_cap-felipe-05

## Quackritcs API

## BASE URL

> link heroku-app

## Route Users:

POST /users

Body format:

```

{
  "user_name": "Andre",
  "email": "email@mail.com",
  "password": "1234",
  "is_adm": true
}

```

Response:

> 201 OK

```

{
  "id": "223ko2idmw-32le-23e233dpfs",
  "user_name": "Andre",
  "email": "email@mail.com",
  "is_adm": true,
  "created_at": "Date"
}

```

GET /users

Response:

> 200 OK

```

[
{
  "id": "223ko2idmw-32le-23e233dpfs"
  "user_name": "Andre",
  "email": "email@mail.com",
  "is_adm": true,
  "created_at": "Date"
}
]

```

GET /users/:id

Request parameters user ID

> Authorization: Bearer {token}

Response:

> 200 OK

```

{
  "id": "223ko2idmw-32le-23e233dpfs"
  "user_name": "Andre",
  "email": "email@mail.com",
  "is_adm": true,
  "created_at": "Date"
}

```

PATCH /users/:id

Important: You must be the owner of the data to acess it

Request parameters user ID

> Authorization: Bearer {token}

Body format,
both changes are optional:

```

{
  "email": "new@email.com",
  "password": "newpassword"
}

```

Response:

> 200 OK

```
{
  "id": "223ko2idmw-32le-23e233dpfs"
  "user_name": "Andre",
  "email": "new@email.com",
  "is_adm": true,
  "created_at": "Date"
}

```

DELETE /users/:id

Important: You must be the owner of the data to acess it

Request parameters user ID

> Authorization: Bearer {token}

Response:

> 200 OK

## Route Login

POST /login

Body format:

```

{
  "email": "new@email.com",
  "password": "newpassword"
}

```

Response:

> 201 CREATED

```

{
  "token": "tokenexample"
}

```

## Route Reviews

POST /reviews/:movie_id

Request parameters movie ID

> Authorization: Bearer {token}

Body format:

Rating value can be 1 to 10

```

{
  "title": "Harry Potter",
  "description": "Lovely movie to watch with your family!",
  "rating": 6,
  "movie_id": 1,
  "user_id":"223ko2idmw-32le-23e233dpfs"
}

```

Response:

> 201 CREATED

```

{
  "title": "Harry Potter",
  "description": "Lovely movie to watch with your family!",
  "rating": 6,
  "movie": 1,
  "user:"223ko2idmw-32le-23e233dpfs"
}

```

GET /reviews/users/:user_id

Request parameters user ID

> Authorization: Bearer {token}

Response:

> 200 OK

```

[
  {
  "title": "Harry Potter",
  "description": "Lovely movie to watch with your family!",
  "rating": 6,
  "movie": 1,
  "user:"223ko2idmw-32le-23e233dpfs"
}
]

```

GET /movies/:movie_id

Request parameters movie ID

Response:

> 200 OK

```

[
  {
  "title": "Harry Potter",
  "description": "Lovely movie to watch with your family!",
  "rating": 6,
  "movie": 1,
  "user":"223ko2idmw-32le-23e233dpfs"
}
]

```

DELETE /reviews/:review_id

Request parameters review ID

> Authorization: Bearer {token}

Response:

> 200 OK

```

{
  "message": "Review deleted"
}

```

## Route Movies

POST /movies

Important: This request needs Admin permission

> Authorization: Bearer {token}

Body format:

```

{
  "title": "Harry Potter",
  "release_year": "10/6/2001"
  "synopse": "Lorem ipsum dorem requires something to describre it",
  "image_url": "http://google.com.br"
}

```

Response:

> 201 CREATED

```

{
    "title": "Harry Potter",
  "release_year": "10/6/2001"
  "synopse": "Lorem ipsum dorem requires something to describre it",
  "image_url": "http://google.com.br"
}

```

GET /movies

Response:

> 200 OK

```

[
{
    "title": "Harry Potter",
  "release_year": "10/6/2001"
  "synopse": "Lorem ipsum dorem requires something to describre it",
  "image_url": "http://google.com.br"
}
]

```

GET /movies/:movie_id

Request parameters movie ID

Response:

> 200 OK

```

{
    "title": "Harry Potter",
  "release_year": "10/6/2001"
  "synopse": "Lorem ipsum dorem requires something to describre it",
  "image_url": "http://google.com.br"
}

```

PATCH /movies/:movie_id

Request parameters movie ID

Important: This request needs Admin permission

> Authorization: Bearer {token}

Body format:

```

{
  "title": "Harry Potter",
  "release_year": "10/6/2001"
  "synopse": "Lorem ipsum dorem requires something to describre it",
  "image_url": "http://google.com.br"
}

```

Response

> 200 OK

```

{
  "message": "Movie updated"
}

```

DELETE /movies/:movie_id

Request parameters movie ID

Important: This request needs Admin permission

> Authorization: Bearer {token}

Response:

> 200 OK

```

{
  "message": "Movie deleted with sucess!"
}

```

## Route Genres

POST /genres

Important: This request needs Admin permission

> Authorization: Bearer {token}

Body format:

```

{
  "name": "Horror"
}

```

Response

> 201 CREATED

```

{
  "id": "eeir23io-43oi43i-dwp2",
  "name": "horror",
  "movies": []
}

```

POST /genres/movie/:movie_id

Important: This request needs Admin permission

Request parameters movie ID

> Authorization: Bearer {token}

Body format:

```
{
  "genreList": ["horror", "comedy"]
}

```

Response:

> 200 OK

```

{
  "message": "Genres add to movie succesfully"
}

```

GET /genres/:genre_id

Request parameters genre ID

Response:

> 200 OK

```

{

 "id": "eeir23io-43oi43i-dwp2",
 "name": "horror",
 "movies": [
  {
    "title": "Harry Potter",
  "release_year": "10/6/2001"
  "synopse": "Lorem ipsum dorem requires something to describre it",
  "image_url": "http://google.com.br",
 }
 ]
}


```

GET /genres

Response:

> 200 OK

```

[
  {
    "id": "eko12p13-12k3o1p2312-13e2",
    "name": "horror",
     "movies":
      [
        {
        "title": "Harry Potter",
        "release_year": "10/6/2001"
        "synopse": "Lorem ipsum dorem requires something to describre it",
        "image_url": "http://google.com.br",
        }
      ]
  },
  {
    "id": "md45ss2-fdpokf34o3kr-334o",
    "name": "comedy",
    "movies":
      [
        {
        "title": "Harry Potter",
        "release_year": "10/6/2001"
        "synopse": "Lorem ipsum dorem requires something to describre it",
        "image_url": "http://google.com.br",
        }
      ]
  }
]

```

DELETE /genres/:genre_id

Important: This request needs Admin permission

Request parameters genre ID

Response:

> 200 OK

```

{
  "message": "Genre has been removed"
}

```
