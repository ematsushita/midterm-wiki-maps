const express = require('express');
const { addList, getPoints, getBounds, getList } = require('./api/listsApi');
const router  = express.Router();

module.exports = (db) => {
  router.post("/create", (req, response) => {
    const owner_id = req.session.user.id;
    const title = req.body.title;
    const desc = req.body.description;

    addList(db, owner_id, title, desc)
      .then(res => {
        if (res.rows.length) {
          let list_id = res.rows[0]["id"];
          return response.redirect(`/lists/${list_id}`);
        }
      });
  });

  router.get("/:id", (req, response) => {

    const templateVars = {
      user: req.params.id
    };

    getPoints(db, req.params.id)
      .then(res => {
        templateVars.points = res.rows;
        return getBounds(db, req.params.id);
      })
      .then(res => {
        templateVars.bounds = res.rows[0];
        return getList(db, req.params.id);
      })
      .then(res => {
        templateVars.list = res.rows[0];
        return response.render("map", templateVars);
      });
  });

  return router;
};
