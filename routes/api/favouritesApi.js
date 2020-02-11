// Returns an array with a favourite object given a userID and listId.
// If it doesn't exist, the array will be empty
const findFave = function(db, userId, listId) {
  return db.query(`
    SELECT * FROM favourites
      WHERE user_id = $1
      AND list_id = $2
    `, [userId, listId]
  );
};

//creates a new record of a favourite for a list id and user id
// returns array with object inside
const addFave = function(db, userId, listId) {
  return db.query(`
    INSERT INTO favourites
      (user_id, list_id)
    VALUES
      ($1, $2)
    RETURNING *
    `, [userId, listId]
  );
};

//removes a record of a favourite given a userid and list id
const removeFave = function(db, userId, listId) {
  return db.query(`
    DELETE FROM favourites
      WHERE user_id = $1
      AND list_id = $2
    `, [userId, listId]
  );
};

// Toggle fave search the database for a favourite record
// If it exists, it deletes it
// If it does not, it creates it
const toggleFave = function(db, userId, listId) {
  return findFave(db, userId, listId)
    .then(value => {
      if (value.rows.length) {
        return removeFave(db, userId, listId)
          .then(() => false);
      } else {
        return addFave(db, userId, listId)
          .then(() => true);
      }
    });
};

module.exports = { toggleFave };
