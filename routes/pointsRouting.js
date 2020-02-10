const express = require('express');
const { getPoints } = require('./api/pointsApi');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:listid", (req, response) => {

    getPoints(db, req.params.listid)
      .then(res => {
        return response.json(res.rows);
      });
  });
  return router;
};
