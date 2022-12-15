const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const route = require("./routes");
const db = require("./config/db");

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use('/public/img', express.static(__dirname + '/public/img'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTTP logger
//app.use(morgan('combined'));

// Teamplate Engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b
    }
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources","views"));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
