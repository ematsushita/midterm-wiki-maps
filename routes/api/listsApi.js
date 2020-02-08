//Adds a new list to the database
const addList = function(db, ownerId, title, desc) {
  return db.query(`
  INSERT INTO lists
  (owner_id, title, description)
  VALUES
  ($1, $2, $3)
  RETURNING *`, [ownerId, title, desc]);
};

//Returns an array of objects representing all the points on a given list
const getPoints = function(db, list_id) {
  return db.query(`
  SELECT * FROM points
  WHERE list_id = $1
  `, [list_id]
  );
};

//Returns a list object given a list id
const getList = function(db, list_id) {
  return db.query(`
  SELECT * FROM lists
  WHERE id = $1
  `, [list_id]);
};

//Returns the bounds of a given list by looking at the outside latitudes and longitudes
const getBounds = function(db, list_id) {
  return db.query(`
  SELECT
  MAX(longitude) as east,
  MAX(latitude) as north,
  MIN(longitude) as west,
  MIN(latitude) as south
  FROM points
  WHERE list_id=$1
  `, [list_id]);
};

module.exports = {
  addList,
  getPoints,
  getList,
  getBounds
};
