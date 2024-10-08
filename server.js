const express = require("express");
const path = require("path");
const RouterHome = require("./routers/home.route");
const RouterBook = require("./routers/book.route");
const RouterAuth = require("./routers/auth.route");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const routeMybooks=require('./routers/mybooks.route')
const routeContact=require('./routers/contact.route')
const routeAbout=require('./routers/about.route')
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");

var store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  // uri: "mongodb://0.0.0.0:27017/library",
  collection: "sessions",
});
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
app.use(flash());
app.use(
  session({
    secret: "This is my secret key",
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    // },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", RouterHome);
app.use("/books", RouterBook);
app.use("/", RouterAuth);
app.use("/mybooks", routeMybooks);
app.use("/", routeContact);
app.use("/", routeAbout);

app.get("/dashboard", (req, res, next) => {
  res.render("dashboard", { verifUser: req.session.userId });
});
app.get("/tables", (req, res, next) => {
  res.render("tables", { verifUser: req.session.userId });
});

// Utiliser la variable d'environnement `PORT` fournie par Render
const port = process.env.PORT || 3000;

// Lier l'application à l'adresse '0.0.0.0' et au port fourni
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});