# Auth Server Boilerplate

I spent way too much time looking for a simple boilerplate that uses MongoDB and has simple authentication already set up. Here is what I came up with.

MongoDB needs to be installed on the server or system that is running. Docker support is currently being worked on.

## Get Started
- `$ git clone https://github.com/jackHedaya/simple-auth-server my-server`
- `$ cd my-server && yarn`

## Usage
- Edit needed lines for your project in:
  + `tests/user.test.js`
  + `src/index.js`
  + `src/db/schemas/account.js`
- Build whatever you want!

## Dependencies
- <a href="https://github.com/expressjs/express">express</a>
- <a href="https://github.com/expressjs/body-parser">body-parser</a>
- <a href="https://github.com/mongodb/node-mongodb-native">mongodb</a>
- <a href="https://github.com/Automattic/mongoose">mongoose</a>
- <a href="https://github.com/kelektiv/node.bcrypt.js">bcrypt</a>
- <a href="https://github.com/kelektiv/node-uuid">uuid</a>
