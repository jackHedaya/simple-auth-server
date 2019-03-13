const User = require("../db/schemas/user");
const Token = require("../db/schemas/token");

/**
 * A middleware to be used on an Express Router
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */

module.exports = async (req, res, next) => {
  if (req.body.email && req.body.password) {
    const user = await User.authenticate(req.body.email, req.body.password);

    if (!user) {
      res.status(403).send({ error: "Incorrect username or password" });
      return;
    }

    req.account = await user.getAccount();

    next();
    return;
  } else if (req.body.token) {
    const account = await Token.getAccount(req.body.token);

    if (!token) {
      res.status(403).send({ error: "Invalid token" });
      return;
    }

    req.account = account;

    next();
    return;
  }

  res.status(403).send({ error: "Authentication is required" });
};
