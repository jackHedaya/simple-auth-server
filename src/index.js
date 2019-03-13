const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authMiddleware = require("./routers/middleware");

const routers = {
  accounts: require("./routers/accounts")
};

const PORT = 3000 || process.env.PORT;

// Edit according to your project
mongoose.connect("mongodb://localhost/project_name");

app.use(bodyParser.urlencoded({ extended: false, limit: "2mb" }));
app.use(bodyParser.json({ limit: "2mb" }));

app.use(routers.accounts);

// Whatever you want that requires auth
app.use("/needsAuth", authMiddleware);

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
