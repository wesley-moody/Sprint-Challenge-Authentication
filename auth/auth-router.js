const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../auth/auth-model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({
    message: `Hello from the auth router!`
  });
});

router.post("/register", async (req, res) => {
  try {
    let hash = bcrypt.hashSync(req.body.password, 12);
    req.body.password = hash;

    const addedUser = await db("users").insert(req.body);
    res.json(addedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.getUserBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.json({
          message: `Hello ${user.username}!`,
          token
        });
      } else {
        res.status(404).json({ message: "Invalid credentials..." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: `Something went wrong.`
      });
    });
});

function signToken(user) {
  const options = {
    expiresIn: "1d"
  };

  const payload = {
    subject: user.id,
    username: user.username
  };

  return jwt.sign(
    payload,
    "with great power, comes great responsibility",
    options
  );
}

module.exports = router;
