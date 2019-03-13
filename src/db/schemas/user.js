const mongoose = require("mongoose");
const uuid = require("uuid/v4");

const auth = require("../../auth");

const Account = require("./account");
const Token = require("./token");

var User = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  account_id: {
    type: String,
    required: true,
    unique: true
  }
});

User.statics.authenticate = async function(email, password) {
  try {
    const user = await this.findOne({ email: email });
    
    if (await auth.compare(password, user.password)) {
      return user;
    }

    return null;
  } catch(_) {
    return null;
  }
}

User.statics.login = async function(email, password) {
  const user = await this.authenticate(email, password)

  if (user) {
    const t = await new Token({ token_id: uuid(), account_id: user.account_id }).save();

    return t.token_id;
  }

  return null;
};

User.statics.createUser = async function({ email, password }) {
  const hash = await auth.hashAndSalt(password),
    account_id = uuid();

  return new this({ email: email, password: hash, account_id: account_id })
    .save()
    .then(() => new Account({ account_id: account_id }).save());
};

User.statics.deleteUser = async function(obj) {
  let account_id = obj.account_id || undefined;

  if (!account_id) {
    const user = await this.findOne(obj);
    if (!user) return;

    account_id = user.account_id;
  }

  const deletedUser = (await this.deleteOne({ account_id })).deletedCount > 0;
  const deletedAccount = (await Account.deleteOne({ account_id })).deletedCount > 0;

  await Token.deleteMany({ account_id });

  if (!(deletedUser && deletedAccount)) console.warn("Either an Account or a User didn't exist");
};

User.methods.getAccount = async () => {
  return Account.findOne({ account_id: this.account_id })
}

module.exports = mongoose.model("User", User);
