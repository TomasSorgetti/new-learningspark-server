const db = require("../../database/connection");
const {HttpError} = require("../../utils/customErrors");

  const getAllPosts = async ({page, limit}) => {
    const offset = (page - 1) * limit;
    const posts = await db.post.findAll({
      offset: offset,
      limit: limit,
      include: {
        model: db.subject,
        as: "subject",
      },
    });
  
    const totalPosts = await db.post.count();
  
    return {
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalItems: totalPosts,
      posts: posts,
    };
  };
  
  const getPostByUrl = async (url) => {
    const post = await db.post.findOne({
      where: { url },
      include: {
        model: db.subject,
        as: "subject",
      },
    });
    if (!post) {
      throw new HttpError(404, "Post not found");
    }
    post.views += 1;
    await post.save();
  
    return post;
  };
  
  const getLatestPosts = async (limit) => {
    const posts = await db.post.findAll({
      order: [["createdAt", "DESC"]],
      limit: limit,
      include: {
        model: db.subject,
        as: "subject",
      },
    });
  
    return posts;
  };
  
  const getPopularPosts = async (limit) => {
    const posts = await db.post.findAll({
      order: [["views", "DESC"]],
      limit: limit,
      include: {
        model: db.subject,
        as: "subject",
      },
    });
  
    return posts;
  };
  
  const getRelatedPosts = async (url, limit) => {
    const post = await db.post.findOne({ where: { url } });
    if (!post) {
      throw new HttpError(404, "Post not found");
    }
    const relatedPosts = await db.post.findAll({
      where: { subjectId: post.subjectId },
      limit: limit,
      include: {
        model: db.subject,
        as: "subject",
      },
    });
  
    return relatedPosts;
  };

  const createPost = async ({title, url, author, description, image, subject}) => {
    return await db.post.create({
      title,
      url,
      author,
      description,
      image,
      subjectId: subject,
    });
  };
  
  const updatePost = async (
    {id,
    title,
    url,
    author,
    description,
    image,
    subject}
  ) => {
    const post = await db.post.findOne({ where: { id } });
    if (!post) {
      throw new HttpError(404, "Post not found");
    }
    post.title = title || post.title;
    post.url = url || post.url;
    post.author = author || post.author;
    post.description = description || post.description;
    post.image = image || post.image;
    post.subject = subject || post.subject;
    await post.save();
  
    return post;
  };
  
  const deletePost = async (id) => {
    const post = await db.post.findOne({ where: { id } });
    if (!post) {
      throw new HttpError(404, "Post not found");
    }
    return await post.destroy();
  };
  


module.exports = {
    getAllPosts,
    getPostByUrl,
    getLatestPosts,
    getPopularPosts,
    getRelatedPosts,
    createPost,
    updatePost,
    deletePost
}