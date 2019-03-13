const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

exports.hashAndSalt = password => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);

  return bcrypt.hash(password, salt);
};

exports.compare = bcrypt.compare;
