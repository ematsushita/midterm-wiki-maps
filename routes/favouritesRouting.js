const express = require('express');
const { toggleFave } = require('./api/favouritesApi');
const router  = express.Router();


module.exports = (db) => {

  //toggles a favourite for a list
  router.post("/:listid", (req, response) => {
    const listId = req.params.listid;
    const userId = req.session.user.id;

    toggleFave(db, userId, listId)
      .then(() => response.status(201).send());
  });

  return router;
};
