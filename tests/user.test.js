const mongoose = require("mongoose");

const User = require("../src/db/schemas/user");
const Account = require("../src/db/schemas/account");

// Edit according to your project
mongoose.connect("mongodb://localhost/project_name-dev");

afterEach(() => {
  return mongoose.connection.db.dropDatabase();
});

describe("User", () => {
  test("should create a user and an account", async () => {
    expect.assertions(2);

    await User.createUser({ email: "jack@exeq.io", password: "123342" });

    const user = await User.findOne({ email: "jack@exeq.io" });
    const account = await Account.findOne({ account_id: user.account_id });

    expect(user).toBeTruthy();
    expect(account).toBeTruthy();
  });

  test("should delete both a user and its account (using email)", async () => {
    expect.assertions(2);

    await User.createUser({ email: "jack1@exeq.io", password: "123342" });

    await User.deleteUser({ email: "jack@exeq.io" })

    const user = await User.findOne({ email: "jack@exeq.io" });
    const account = await Account.findOne({ email: "jack@exeq.io" });

    expect(user).toBeFalsy();
    expect(account).toBeFalsy();
  });

  test("should delete both a user and its account (using account_id)", async () => {
    expect.assertions(2);

    await User.createUser({ email: "jack@exeq.io", password: "123342" });

    const account_id = (await User.findOne({ email: "jack@exeq.io" })).account_id;

    await User.deleteUser({ account_id });

    const user = await User.findOne({ email: "jack@exeq.io" });
    const account = await Account.findOne({ email: "jack@exeq.io" });

    expect(account).toBeFalsy();
    expect(user).toBeFalsy();
  });
});