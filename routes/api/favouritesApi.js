const findFave = function (db, user_id, list_id) {
  return db.query(
    `
    SELECT * FROM favourites
    WHERE user_id = $1
    AND list_id = $2
    `, [user_id, list_id]
  )
};


const addFave = function (db, user_id, list_id) {
  return db.query(
    `
    INSERT INTO favourites
    (user_id, list_id)
    VALUES
    ($1, $2)
    RETURNING *
    `, [user_id, list_id]
  )
};


const removeFave = function (db, user_id, list_id) {
  return db.query(
    `
    DELETE FROM favourites
    WHERE user_id = $1
    AND list_id = $2
    `, [user_id, list_id]
  )
};


const toggleFave = function (db, user_id, list_id) {
  return findFave(db, user_id, list_id)
    .then(value => {
      if (value.rows.length) {
        return removeFave(db, user_id, list_id)
          .then(() => false);
      } else {
        return addFave(db, user_id, list_id)
          .then(() => true);
      }
    })
};


module.exports = {
  toggleFave
}
