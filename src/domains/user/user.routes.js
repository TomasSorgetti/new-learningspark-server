const { Router } = require("express");
const controllers = require("./user.controller");
const userRouter = Router();

userRouter.get("/:id", controllers.getUser);
//todo protected routes
userRouter.get("/", controllers.getAllUsers);
userRouter.put("/change-role", controllers.changeRole);

module.exports = userRouter;
