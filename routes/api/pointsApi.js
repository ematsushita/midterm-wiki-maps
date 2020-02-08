const getPoints = function(db, listId) {
  return db.query(`
    SELECT *
    FROM points
    WHERE list_id = $1
  `, [listId]);
};

module.exports = {
  getPoints
};
