const express = require('express');
const { getUserById } = require('./api/userApi');
const router  = express.Router();

module.exports = (db) => {
  router.post("/login/:id", (req, response) => {

    getUserById(db, req.params.id)
      .then(res => {
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
