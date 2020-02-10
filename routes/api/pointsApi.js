const getPoints = function(db, listId) {
  return db.query(`
    SELECT *
    FROM points
    WHERE list_id = $1
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

const deletePoint = function (db, ownerId, listId) {
  return db.query(`
    DELETE FROM table points
    WHERE owner_id = $1
    AND list_id = $2
  `, [ownerId, listId])
}

const updatePoint = function (db, pointid, title, description) {
  return db.query(`
    UPDATE table points
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
