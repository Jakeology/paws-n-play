const router = require("express").Router();
const { Pet, User } = require("../models");

router.get("/", (req, res) => {
  Pet.findAll({
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
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

router.get("/pet/:id", (req, res) => {
  Pet.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name", "email", "phone_number"],
      },
    ],
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No pet found with this id" });
        return;
      }

      // serialize the data
      const pet = dbPetData.get({ plain: true });

      // pass data to template
      res.render("single-pet", {
        pet,
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

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
