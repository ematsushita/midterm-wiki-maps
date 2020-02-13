const express = require('express');
const { getPoints, addPoint, deletePoint, updatePoint } = require('./api/pointsApi');
const router  = express.Router();

module.exports = (db) => {

  //get array of points objects for rendering
  router.get("/:listid", (req, response) => {

    getPoints(db, req.params.listid)
      .then(res => response.json(res.rows));
  });

  //Add a new point to a list given its id
  router.post("/:listid/add", (req, response) => {
    const ownerId = 1//req.session.user.id;
    const listId = req.params.listid;
    const { title, description, imgUrl, latitude, longitude } = req.body;

    addPoint(db, ownerId, listId, title, description, imgUrl, latitude, longitude)
      .then(() => response.status(201).send());
  });

  //Update title/description of a point
  router.post("/:listid/update/:pointid", (req, response) => {
    const { pointid } = req.params;
    const { title, description, imgUrl } = req.body;

    updatePoint(db, pointid, title, description, imgUrl)
      .then(() => response.status(201).send());
  });

  //Delete a point from a list
  router.post("/:listid/remove/:pointid", (req, response) => {

    deletePoint(db, req.params.pointid)
      .then(() => response.status(201).send());
  });

  return router;
};
