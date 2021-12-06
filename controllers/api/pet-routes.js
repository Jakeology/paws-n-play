const router = require("express").Router();
const { User, Pet } = require("../../models");

// GET /api/pets
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method)
  Pet.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name"],
        as: "Owner",
      },
    ],
  })
    .then((dbPetData) => res.json(dbPetData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/pets/1
router.get("/:id", (req, res) => {
  Pet.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name"],
        as: "Owner",
      },
    ],
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No pet found with this id" });
        return;
      }
      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/pets
router.post("/", (req, res) => {
  // expects {username: 'jake', email: 'jake@gmail.com', password: 'jakespassword'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
});

module.exports = router;
