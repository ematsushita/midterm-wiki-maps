# db API function references

## users

<!-- ### Add new user
`addUser(name, email, password)` will query the db and add a row to the users table. It must return a promise with the entire user row, ie. `{ id: 1, name: name, email: email@email.com, password: 4d6h%4F7$$ }`

Assumptions:
  * `name` will be a non-empty string
  * `email` will be a non-empty string
  * `password` will be a non-empty string, already hashed

### Fetch user by email
`getUserByEmail(email)` will query the db and return a promise with the entire user row if there is a match to the email parameter, or `null` if there is no match. ie. `{ id: 1, name: name, email: email@email.com, password: 4d6h%4F7$$ }`

Assumptions:
  * `email` will be a non-empty string -->

### Fetch user by id
`getUserByEmail(id)` will query the db and return a promise with the entire user row if there is a match to the id parameter, or `null` if there is no match. ie. `{ id: 1, name: name }`

Assumptions:
  * `id` will be a non-empty string
<!-- 
### Update user account (STRETCH)

`updateUser(id, name, email, password)` will query the database for a particular user and update the rows based on passed in parameters. `name`, `email`, and `password` are optional parameters. Only update the parameters that are not `undefined`.

Assumptions:
  * `id` will be a non-empty string and guaranteed to be passed
  * (optional) `name` will be a non-empty string
  * (optional) `email` will be a non-empty string
  * (password) `password` will be a non-empty string, already hashed

### Delete user account (STRETCH)

`deleteUser(id)` will query the database for a particular user based on the passed in id and delete that entire row.

Assumptions:
  * `id` will be a non-empty string and guaranteed to be passed -->

## lists

### Add a new list
`addList(ownerId, title, desc, cat)` will query the db and add a row to the lists table. It must return a promise with the entire list row, ie. `{ id: 1, owner_id: 1, title: title, description: "a new list", category: "restaurants" }`

Assumptions:
  * `id` will be a non-empty string corresponding to the owning user id
  * `title` will be a non-empty string (STRETCH)
  * `desc` will be a non-empty string (STRETCH)
  * `cat` will be a non-empty string (STRETCH)

### Update a list (STRETCH)
`updateList(id, title, desc, cat)` will query the db and update a row on the lists table based on passed in parameters. `title`, `desc`, and `cat` are optional parameters. Only update the parameters that are not `undefined`.

Assumptions:
  * `id` will be a non-empty string corresponding to the owning user id
  * (optional) `title` will be a non-empty string
  * (optional) `desc` will be a non-empty string
  * (optional) `cat` will be a non-empty string

<!-- ### Add contributor to a list (OPTIONAL)
`addContributor(userId, listId)` creates a relationship between a list and a contributing user in the contributors table.

Assumptions:
  * `userId` will be a corresponding id in the users table
  * `listId` will be a corresponding id in the lists table 

### Remove contributor from a list (OPTIONAL)
`remContributor(id)` a row in the contributors table.

Assumptions:
  * `id` will be the unique list id in the contributors table. -->

## points

### Add a new point
`addPoint(ownerId, title, desc, imgUrl)` will query the db and add a row to the points table. It must return a promise with the entire list row, ie. `{ id: 1, owner_id: 1, title: title, description: "a new point", img_url: "http://www.picture.com/image.png" }`

Assumptions:
  * `id` will be a non-empty string corresponding to the owning user id
  * `title` will be a non-empty string
  * `desc` will be a non-empty string
  * `imgUrl` will be a non-empty string that is a complete URL

### Update a point
`updatePoint(id, title, desc, imgUrl)` will query the db and update a row on the lists table based on passed in parameters. `title`, `desc`, and `imgUrl` are optional parameters. Only update the parameters that are not `undefined`.

Assumptions:
  * `id` will be a non-empty string corresponding to the owning user id
  * (optional) `title` will be a non-empty string
  * (optional) `desc` will be a non-empty string
  * (optional) `imgUrl` will be a non-empty string

### Remove a point
`remPoint(id)` will query the db and remove an entire row on the points table based on the passed in point id. 

Assumptions
* `id` will be the unique list id in the points table.

## favourites

### Add a favourite

`addFav(userId, listId)` will query the db and add a row to the favourites table linking a list to a user's favourite list

Assumptions:
* `userId` will be a non-empty string corresponding to the favouriting user id
* `listId` will be a non-empty string corresponding to the list id being favourited

