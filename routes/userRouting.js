const express = require('express');
const { getUserById } = require('./api/userApi');
const router  = express.Router();

module.exports = (db) => {

  //Log in a user given an id
  //This demonstration app uses an auto login feature
  //to demonstrate authentication but does not actually use credentials
  router.post("/login/:id", (req, response) => {

    //fetches user object by id
    getUserById(db, req.params.id)
      .then(res => {
        //if user exists, log them in, redirect to home page
        if (res.rows.length) {
          req.session.user = res.rows[0];
          return response.redirect("/");
        }
      })
      .catch(err => console.error(err.stack));
  });

  //Log user out by clearing their cookies, redirect to home page
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
