//Returns a user object given an id
const getUserById = function(db, id) {
  return db.query(`
  SELECT * FROM users
  WHERE id=$1`, [id]);
};

module.exports = {
  getUserById
};
