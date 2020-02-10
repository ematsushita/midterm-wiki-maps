const express = require('express');
const {
  addList,
  getPoints,
  getBounds,
  getList,
  getFavs,
  getMyMaps,
  getMyContributions,
  getAllOtherMaps
} = require('./api/listsApi');
const router  = express.Router();

module.exports = (db) => {
  router.post("/create", (req, response) => {
    const ownerId = req.session.user.id;
    const title = req.body.title;
    const desc = req.body.description;

    addList(db, ownerId, title, desc)
      .then(res => {
        if (res.rows.length) {
          let listId = res.rows[0]["id"];
          return response.redirect(`/lists/${listId}`);
        }
      });
  });

  router.get("/:id/attributes", (req, response) => {
    getList(db, req.params.id)
      .then(res => {
        return response.json(res.rows[0]);
      });
  });

  router.get("/:id/bounds", (req, response) => {
    getBounds(db, req.params.id)
      .then(res => {
        return response.json(res.rows[0]);
      });
  });

  router.get("/:id", (req, response) => {

    const templateVars = {
      user: req.session.user.id,
      list: {id: req.params.id}
    };

    // getPoints(db, req.params.id)
    //   .then(res => {
    //     templateVars.points = res.rows;
    //     return getBounds(db, req.params.id);
    //   })
    //   .then(res => {
    //     templateVars.bounds = res.rows[0];
    //     return getList(db, req.params.id);
    //   })
    //   .then(res => {
    //     templateVars.list = res.rows[0];
    //     return response.render("map", templateVars);
    //   });

    return response.render("map", templateVars);
  });

  router.get("/", (req, response) => {
    const userId = 1;

    const lists = {};

    return getFavs(db, userId)
      .then(res => {
        lists.favs = res.rows;
        return getMyMaps(db, userId);
      })
      .then(res => {
        lists.myMaps = res.rows;
        return getMyContributions(db, userId);
      })
      .then(res => {
        lists.myContributions = res.rows;
        return getAllOtherMaps(db, userId);
      })
      .then(res => {
        lists.allMaps = res.rows;
        return response.json(lists);
      });
  });

  return router;
};
