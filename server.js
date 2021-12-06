const express = require("express");
const controllers = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const path = require("path");

const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//setup the handlebars engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(controllers);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
