//Returns a user object [{ id, name }] given an id
const getUserById = (db, userId) => db.query(`SELECT * FROM users WHERE id=$1`, [userId]);

module.exports = { getUserById };
