const { Router } = require("express");
const controller = require("./post.controller");
const blogRouter = Router();

blogRouter.get("/", controller.getAllPosts);
blogRouter.get("/:url", controller.getPostByUrl);
blogRouter.get("/latest", controller.getLatestPosts);
blogRouter.get("/popular", controller.getPopularPosts);
blogRouter.get("/related/:url", controller.getRelatedPosts);

blogRouter.post("/", controller.createPost);
blogRouter.put("/:id", controller.updatePost);
blogRouter.delete("/:id", controller.deletePost);

module.exports = blogRouter;
