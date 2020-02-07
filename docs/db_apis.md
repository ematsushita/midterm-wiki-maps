# db API function references

## users

### Add new user
`addUser(name, email, password)` will query the db and add a row to the users table. It must return a promise with the entire user row, ie. `{ id: 1, name: name, email: email@email.com, password: 4d6h%4F7$$ }`

Assumptions:
  * name will be a non-empty string
  * email will be a non-empty string
  * password will be a non-empty string, already hashed

### Fetch user by email
`getUserByEmail(email)` will query the db and return a promise with the entire user row if there is a match to the email parameter, or `null` if there is no match. ie. `{ id: 1, name: name, email: email@email.com, password: 4d6h%4F7$$ }`

Assumptions:
  * email will be a non-empty string

### Fetch user by id
`getUserByEmail(id)` will query the db and return a promise with the entire user row if there is a match to the id parameter, or `null` if there is no match. ie. `{ id: 1, name: name, email: email@email.com, password: 4d6h%4F7$$ }`

Assumptions:
  * id will be a non-empty string

### Update user account (STRETCH)

`updateUser(id, name, email, password)` will query the database for a particular user and update the rows based on passed in parameters. `name`, `email`, and `password` are optional parameters. Only update the parameters that are not `undefined`.

Assumptions:
  * id will be a non-empty string and guaranteed to be passed
  * (optional) name will be a non-empty string
  * (optional) email will be a non-empty string
  * (password) password will be a non-empty string, already hashed

### Delete user account (STRETCH)

`deleteUser(id)` will query the database for a particular user based on the passed in id and delete that entire row.

Assumptions:
  * id will be a non-empty string and guaranteed to be passed

