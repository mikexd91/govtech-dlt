const cors = require("cors");
const express = require("express");
const cookieSession = require("cookie-session");

const apiRoutes = require("./routes");

const app = express();

const expressSwagger = require("express-swagger-generator")(app);
const corsOptions = {
  origin: "http://localhost:8080",
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
app.use("/v1/api", apiRoutes);

let options = {
  swaggerDefinition: {
    info: {
      description: "This is a sample server",
      title: "Swagger",
      version: "1.0.0",
    },
    host: "localhost:5000",
    basePath: "/v1",
    produces: ["application/json"],
    schemes: ["http", "https"],
  },
  basedir: __dirname, //app absolute path
  files: ["./**/**/*.js"], //Path to the API handle folder
};
expressSwagger(options);

app.listen(5000, function () {
  console.log("Running on port 5000!");
});

module.exports = app;
