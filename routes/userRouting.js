const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/login/:id", (req, res) => {
    const getUserById = function(id) {
      return db.query(`
      SELECT * FROM users
      WHERE id=$1`, [id])
    };
    const user = getUserById(req.params.id);
    if (user) {
      req.session.user_id = user.id;
      return res.redirect("/");
    }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
