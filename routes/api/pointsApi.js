// Gets a list of all points objects from a given list
// Fave ID is returned so front end can show correct favourite status
const getPoints = function(db, listId) {
  return db.query(`
    SELECT points.*, favourites.id as fave_id
    FROM points
      LEFT JOIN favourites ON points.list_id = favourites.list_id
    WHERE points.list_id = $1
    ORDER BY points.id
  `, [listId]);
};

// Adds a point to the database given all necessary parameters
// Returns point object back to front end
const addPoint = function(db, ownerId, listId, title, description, imgUrl, latitude, longitude) {
  return db.query(`
    INSERT INTO points
      (list_id, owner_id, title, description, img_url, latitude, longitude)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `, [ownerId, listId, title, description, imgUrl, latitude, longitude]);
};

// Removes a point from a database given a point id
const deletePoint = function(db, pointId) {
  return db.query(`
    DELETE FROM points
    WHERE id=$1
  `, [pointId]);
};

// Updates an existing point by ID, given new parameters.
// All fields are required - therefore,
// front end pre-populates fields with existing data so entire row is rewritten on each update
const updatePoint = function(db, pointid, title, description, imgUrl) {
  return db.query(`
    UPDATE points
    SET title = $1,
        description = $2
        img_url = $4
    WHERE id = $3
    RETURNING *
  `, [title, description, pointid, imgUrl]);
};

module.exports = {
  getPoints,
  addPoint,
  deletePoint,
  updatePoint
};
