const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
} = require("../controllers/postController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const postRouter = express.Router();

postRouter.route("/post/create").post(isLoggedIn, createPost);
postRouter.route("/post/update/:id").put(isLoggedIn, updatePost);
postRouter.route("/post/delete/:id").delete(isLoggedIn, deletePost);
postRouter.route("/post/get").get(getPosts);

module.exports = postRouter;
