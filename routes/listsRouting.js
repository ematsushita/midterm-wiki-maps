const express = require('express');
const {
  addList,
  getBounds,
  getList,
  getMapLists
} = require('./api/listsApi');
const router  = express.Router();

module.exports = (db) => {

  //Create a new list in the database, redirects to that list page
  router.post("/create", (req, response) => {
    const ownerId = req.session.user.id;
    const title = req.body.title;
    const desc = req.body.description;

    addList(db, ownerId, title, desc)
      .then(res => response.redirect(`/lists/${res.rows[0]["id"]}`))
      .catch(err => console.error(err.stack));
  });

  //Fetch list title and description for display on the list map page
  router.get("/:id/attributes", (req, response) => {

    getList(db, req.session.user.id, req.params.id)
      .then(res => response.json(res.rows[0]))
      .catch(err => console.err(err.stack));
  });

  //Fetch bounds of a map given its point locations
  router.get("/:id/bounds", (req, response) => {

    getBounds(db, req.params.id)
      .then(res => response.json(res.rows[0]))
      .catch(err => console.err(err.stack));
  });

  //point user to a list map display page
  router.get("/:id", (req, response) => {
    const user = req.session.user.id;
    const listId = req.params.id;

    return response.render("map", { user, listId });
  });

  //point user to front page with all necessary map list data
  router.get("/", (req, response) => {
    getMapLists(db, req.session.user.id)
      .then(res => response.json(res));
  });

  return router;
};
