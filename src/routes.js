const { Router } = require("express");

const routes = Router();

routes.use("/auth", require("./domains/auth/auth.routes"));
routes.use("/user", require("./domains/user/user.routes"));
routes.use("/posts", require("./domains/post/post.routes"));

module.exports = routes;
