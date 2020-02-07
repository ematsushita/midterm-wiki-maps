# db API function references

## users

### Add new user
`addUser(name, email, password)` will query the db and add a row to the users table. It must return a promise with the entire user row, ie. `{ id: 1, name: name, email: email@email.com, password: 4d6h%4F7$$ }`

Assumptions:
  * name will be a non-empty string
  * email will be a non-empty string
  * password will be a non-empty string, already hashed

### Fetch user by email
`getUserByEmail(email)` will query the db and return a promise with the entire user row if there is a match to the email parameter, or `null` if there is no match.

Assumptions:
  * email will be a non-empty string

### Fetch user by id
`getUserByEmail(id)` will query the db and return a promise with the entire user row if there is a match to the id parameter, or `null` if there is no match.

Assumptions:
  * id will be a non-empty string
