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
      });

    router.get("/:id", (req, res) => {
      let templateVars = {
        user: req.session.user,
        list: req.params.id,
      };
      res.render("map", templateVars);
    });
  });

  return router;
};
