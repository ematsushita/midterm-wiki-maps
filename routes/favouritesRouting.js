const express = require('express');
const { toggleFave } = require('./api/favouritesApi');
const router  = express.Router();


module.exports = (db) => {

  router.post("/:listid", (req, response) => {
    const listId = req.params.listid;
    const userId = 1 //req.session.user.id;

    toggleFave(db, userId, listId)
      .then(res => {
        response.status(201).send();
      });
  })

return router;

}
