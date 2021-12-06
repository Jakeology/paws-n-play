const router = require("express").Router();
const { Pet, User } = require("../models");

router.get("/", (req, res) => {
  Pet.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name"],
      },
    ],
  })
    .then((dbPetData) => {
      // pass a single post object into the homepage template
      const pets = dbPetData.map((pet) => pet.get({ plain: true }));
      res.render("homepage", {
        pets,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
