const { Router } = require("express");
const controller = require("./role.controller");
const roleRouter = Router();

roleRouter.get("/", controller.getAllRoles);
roleRouter.post("/", controller.createRole);
roleRouter.delete("/:id", controller.deleteRole);

module.exports = roleRouter;
