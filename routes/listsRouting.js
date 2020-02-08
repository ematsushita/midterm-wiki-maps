const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/create", (req, response) => {
    const addList = function(ownerId, title, desc) {
      return db.query(`
      INSERT INTO lists
      (owner_id, title, description)
      VALUES
      ($1, $2, $3)
      RETURNING *`, [ownerId, title, desc]);
    };
    const owner_id = req.session.user.id;
    const title = req.body.title;
    const desc = req.body.description;

    addList(owner_id, title, desc)

      .then(res => {
        if (res.rows.length) {
          let list_id = res.rows[0]["id"];
          return response.redirect(`/lists/${list_id}`);
        }
      })
  });

  router.get("/:id", (req, response) => {
    const getPoints = function(list_id) {
      return db.query(`
      SELECT * FROM points
      WHERE list_id = $1
      `, [list_id]
      );
    };

    const getList = function(list_id) {
      return db.query(`
      SELECT * FROM lists
      WHERE id = $1
      `, [list_id])
    }

    const getBounds = function(list_id) {
      return db.query(`
      SELECT
      MAX(longitude) as east,
      MAX(latitude) as north,
      MIN(longitude) as west,
      MIN(latitude) as south
      FROM points
      WHERE list_id=$1
      `, [list_id])
    };

    let templateVars = {
      user: req.params.id
    }

    getPoints(req.params.id)
      .then (res => {
        templateVars.points = res.rows
        return getBounds(req.params.id)
      })
      .then(res => {
        templateVars.bounds = res.rows[0]
        return getList(req.params.id)
      })
      .then(res => {
      templateVars.list = res.rows[0]
      return response.render("map", templateVars);
    })
  });

  return router;
};
