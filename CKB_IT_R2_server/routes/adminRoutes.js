const express  = require("express");

const route = express.Router();
const teamController = require("../controllers/adminController");

route.get("/getTeams",teamController.getTeams);

route.post("/create",teamController.createQuestion);

route.put("/update/:id",teamController.updateQuestion);

route.delete("/delete/:id",teamController.deleteQuestion);


module.exports = route;