const getPoints = function(db, listId) {
  return db.query(`
    SELECT points.*, favourites.id as fave_id
    FROM points
    LEFT JOIN favourites ON points.list_id = favourites.list_id
    WHERE points.list_id = $1
  `, [listId]);
};

const addPoint = function(db, ownerId, listId, title, description, latitude, longitude) {
  return db.query(`
    INSERT INTO points
    (list_id, owner_id, title, description, latitude, longitude)
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *`, [ownerId, listId, title, description, latitude, longitude]);
};

const deletePoint = function (db, point_id) {
  return db.query(`
    DELETE FROM points
    WHERE id=$1
  `, [point_id])
}

const updatePoint = function (db, pointid, title, description) {
  return db.query(`
    UPDATE points
    SET title = $1,
        description = $2
    WHERE id = $3
    RETURNING *
  `, [title, description, pointid])
}


module.exports = {
  getPoints,
  addPoint,
  deletePoint,
  updatePoint
};
