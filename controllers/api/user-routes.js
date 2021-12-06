const router = require("express").Router();
const { User, Pet } = require("../../models");

// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method)
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Pet,
        attributes: ["id", "name", "age", "breed, location"],
        as: "pets",
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.json({ success: false, message: "No user found with this id" });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  // expects {username: 'jake', email: 'jake@gmail.com', password: 'jakespassword'}
  User.findOne({ where: { email: req.body.email } }).then((exist) => {
    if (exist) {
      return res.json({ success: false, type: "INVALID_EMAIL", message: "Email already registered" });
    } else {
      User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
      })
        .then((dbUserData) => {
          req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.loggedIn = true;

            res.json(dbUserData);
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      return res.json({ success: false, type: "INVALID_EMAIL", message: "No user with that email address" });
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.json({ success: false, type: "INVALID_PASS", message: "Incorrect password" });
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res.json({ success: true, user: dbUserData, message: "You are now logged in" });
    });
  });
});

// PUT /api/users/1
router.put("/:id", (req, res) => {
  // expects {username: 'jake', email: 'jake@gmail.com', password: 'jakespassword'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        return res.json({ success: false, message: "No user found with this id" });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.json({ success: false, message: "No user found with this id" });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
