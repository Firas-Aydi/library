const route = require("express").Router();
const aboutController = require("../controllers/about.controller");

route.get("/about", aboutController.getPageAbout);

module.exports=route