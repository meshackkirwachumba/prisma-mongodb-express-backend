const prisma = require("../prisma/index");

//create a new post
exports.createPost = async (req, res, next) => {
  try {
    const { slug, title, body, authorId } = req.body;
    if (!slug || !title || !body || !authorId) {
      throw new Error("Provide all fields");
    }
    const post = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        author: { connect: { id: authorId } },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    throw new Error(error);
  }
};

//update post
exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    result = await prisma.post.update({
      where: { id: id },
      data: {
        title: title,
        body: body,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.json(`Post with ${id} does not exists`);
  }
};

//delete post
exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    result = await prisma.post.delete({
      where: { id: id },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.json(`Post with ${id} does not exists`);
  }
};

//get all posts
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.json({ error: "No posts were found" });
  }
};
