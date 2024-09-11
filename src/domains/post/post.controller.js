const service = require("./post.service");
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/responseHandler");


const getAllPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

    try {
        const data = await service.getAllPosts({page, limit});
        sendSuccessResponse(res, 200, "Get All Posts Success", data);
    } catch (error) {
        sendErrorResponse(res, error.message, error.status);
    }
};

const getPostByUrl = async (req, res) => {
    const { url } = req.params;
    try {
        const data = await service.getPostByUrl(url);
        sendSuccessResponse(res, 200, "Get Post Success", data);
    } catch (error) {
        sendErrorResponse(res, error.message, error.status);
    }
}

const getLatestPosts = async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 3;
  
    try {
      const data = await service.getLatestPosts(limit);
      sendSuccessResponse(res, 200, "Get Latest Posts Success", data);
    } catch (error) {
        sendErrorResponse(res, error.message, error.status);
    }
  };
  
const getPopularPosts = async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 5;
  
    try {
      const data = await service.getPopularPosts(limit);
      sendSuccessResponse(res, 200, "Get Popular Posts Success", data);
    } catch (error) {
        sendErrorResponse(res, error.message, error.status);
    }
  };

const getRelatedPosts = async (req, res, next) => {
    const { url } = req.params;
    const limit = parseInt(req.query.limit) || 3;
  
    try {
      const data = await service.getRelatedPosts(url, limit);
      sendSuccessResponse(res, 200, "Get Related Posts Success", data);
    } catch (error) {
        sendErrorResponse(res, error.message, error.status);
    }
}

const createPost = async (req, res) => {
    const { title, url, author, description, image, subject } = req.body;
    try {
        const data = await service.createPost({ title, url, author, description, image, subject });
        sendSuccessResponse(res, 200, "Post Created Success", data);
    } catch (error) {
        sendErrorResponse(res, error.message, error.status);
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        url,
        author,
        description,
        image,
        subject,
    } = req.body;
    try {
        const data = await service.updatePost({id,
            title,
            url,
            author,
            description,
            image,
            subject});
        sendSuccessResponse(res, 200, "Post Updated Success", data);
    } catch (error) {
        sendErrorResponse(res, error.message, error.status);
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await service.deletePost(id);
        sendSuccessResponse(res, 200, "Post Deleted Success", data);
    } catch (error) {
        sendErrorResponse(res, error.message, error.status);
    }
}

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