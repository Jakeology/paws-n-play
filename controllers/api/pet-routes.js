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
      },
    ],
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.json({ success: false, message: "No pet found with this id" });
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
  Pet.create({
    name: req.body.name,
    age: req.body.age,
    breed: req.body.breed,
    location: req.body.location,
    vaccinated: req.body.vaccinated,
    about: req.body.about,
    pfp: req.body.pfp,
    owner_id: req.session.user_id,
  })
    .then((dbPetData) => {
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Pet.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        return res.json({ success: false, message: "No Pet found with this id" });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/pets/1
router.delete("/:id", (req, res) => {
  Pet.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.json({ success: false, message: "No pet found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
