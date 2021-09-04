const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const apiRoutes = require("./routes");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(express.json());
app.use(apiRoutes);

app.listen(5000, function () {
  console.log("Running on port 5000!");
});

module.exports = app;
