// Adds a new map list to the database and returns the list object back [{ id, owner_id, title, description }]
const addList = function(db, ownerId, title, desc) {
  return db.query(`
    INSERT INTO lists (owner_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [ownerId, title, desc]
  );
};

// Returns an array of objects
//      { id, list_id, owner_id, title, description, img_url, longitude, latitude }
// representing all the points on a given list
const getPoints = function(db, listId) {
  return db.query(`
    SELECT * FROM points
      WHERE list_id = $1
    `, [listId]
  );
};

// Returns a list object { id, owner_id, title, description, fave_id } given a list id
// fave_id will be null if it has not been favourited given the user id
const getList = function(db, userId, listId) {
  return db.query(`
    SELECT lists.*,
      CASE WHEN EXISTS (SELECT FROM favourites WHERE list_id = $2 AND user_id = $1)
        THEN favourites.id
        ELSE NULL
      END as fave_id
    FROM lists
      LEFT JOIN favourites ON favourites.list_id = lists.id
    WHERE lists.id = $2
  `, [userId, listId]);
};

// Returns the bounds of a given list { east, north, west, south }
// by looking at the outside latitudes and longitudes
const getBounds = function(db, listId) {
  return db.query(`
    SELECT
      MAX(longitude) as east,
      MAX(latitude) as north,
      MIN(longitude) as west,
      MIN(latitude) as south
    FROM points
    WHERE list_id = $1
  `, [listId]);
};

//Returns a list of all of a user's favourited list objects
const getFavs = function(db, userId) {
  return db.query(`
    SELECT lists.id, lists.owner_id, lists.title, lists.description, favourites.id as fave_id
    FROM lists
      JOIN favourites ON lists.id = favourites.list_id
    WHERE favourites.user_id = $1
  `, [userId]);
};

//Returns a list of all the list objects created by a user
const getMyMaps = function(db, userId) {
  return db.query(`
    SELECT lists.*, favourites.id as fave_id
    FROM lists
      LEFT JOIN favourites ON favourites.list_id = lists.id
    WHERE owner_id = $1
  `, [userId]);
};

//Returns a list of all the list objects with at least one point contributed by a user
const getMyContributions = function(db, userId) {
  return db.query(`
    SELECT lists.id, lists.owner_id, lists.title, lists.description
    FROM lists
      JOIN points ON points.list_id = lists.id
    WHERE points.owner_id = $1 AND NOT lists.owner_id = $1
  `, [userId]);
};

//Returns a list of all list objects not already in favourites, owned, or contributed to by a user
const getAllOtherMaps = function(db, userId) {
  return db.query(`
    SELECT DISTINCT lists.id, lists.owner_id, lists.title, lists.description
    FROM lists
    WHERE NOT lists.owner_id = $1
      AND lists.id NOT IN (
        SELECT list_id
        FROM favourites
        WHERE user_id = $1
      )
      AND lists.id NOT IN (
        SELECT lists.id
        FROM lists
          JOIN points ON points.list_id = lists.id
        WHERE points.owner_id = $1
      )
    ORDER BY lists.id
  `, [userId]);
};

module.exports = {
  addList,
  getPoints,
  getList,
  getBounds,
  getFavs,
  getMyMaps,
  getMyContributions,
  getAllOtherMaps
};
