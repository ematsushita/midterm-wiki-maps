const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/login/:id", (req, response) => {
    const getUserById = function(id) {
      return db.query(`
      SELECT * FROM users
      WHERE id=$1`, [id])
    };
    getUserById(req.params.id)

      .then (res => {
        if (res.rows.length) {
        req.session.user = res.rows[0];
        return response.redirect("/");
      }
    });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
