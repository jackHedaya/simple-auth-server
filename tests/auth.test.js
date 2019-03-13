const auth = require("../src/auth");

describe("Authentication", () => {
  test("correct password should pass", async () => {
    const hash = await auth.hashAndSalt("My Test Password");

    expect(await auth.compare("My Test Password", hash)).toBe(true);
  });

  test("incorrect password should fail", async () => {
    const hash = await auth.hashAndSalt("My Test Password");

    expect(await auth.compare("My Test Password1", hash)).toBe(false);
  })
});