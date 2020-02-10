const express = require('express');
const { getPoints, addPoint, deletePoint, updatePoint } = require('./api/pointsApi');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:listid", (req, response) => {

    getPoints(db, req.params.listid)
      .then(res => {
        return response.json(res.rows);
      });
  });


  //Add a new point to a list
  router.post("/:listid/add", (req, response) => {
    const ownerId = req.session.user.id;
    const listId = req.params.listid;
    const { title, description, latitude, longitude } = req.body

    addPoint(db, ownerId, listId, title, description, latitude, longitude)
      .then(res => {
        console.log(res)
        return response.status(200);
      });
    });


  //Update title/description of a point
  router.post("/:listid/update/:pointid", (req, response) => {
    const { pointid } = req.params;
    const { title, description } = req.body;

    updatePoint(db, pointid, title, description)
      .then (res => {

      });
  });


  //Delete a point from a list
  router.post("/:listid/remove/:pointid")

  return router;
};
