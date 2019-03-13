const app = require("express").Router();

const User = require("../db/schemas/user");

app.post("/signup", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ error: "Username or password not filled" });
    return;
  }

  const email = req.body.email,
    password = req.body.password;

  User.createUser({ email, password })
    .then(() => res.status(200).send())
    .catch(e => res.status(400).send({ error: `${e.name}: ${e.message}` }));
});

app.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ error: "Username or password not filled" });
    return;
  }

  const token = await User.login(req.body.email, req.body.password);

  if (token) {
    res.status(200).send({ token });
  } else {
    res.status(403).send({ error: "Incorrect username or password" });
  }
});

module.exports = app;
