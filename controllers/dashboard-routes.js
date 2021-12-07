const router = require("express").Router();
const { Pet, User } = require("../models");

router.get("/", (req, res) => {
  Pet.findAll({
    where: {
      // use the ID from the session
      owner_id: req.session.user_id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name"],
      },
    ],
  })
    .then((dbPetData) => {
      // serialize data before passing to template
      const pets = dbPetData.map((pet) => pet.get({ plain: true }));
      res.render("dashboard", { pets, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", (req, res) => {
  Pet.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
      },
    ],
  })
    .then((dbPetData) => {
      const pet = dbPetData.get({ plain: true });

      res.render("edit-pet", {
        pet,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/add-pet", (req, res) => {
  res.render("add-pet", { loggedIn: true });
});

module.exports = router;
