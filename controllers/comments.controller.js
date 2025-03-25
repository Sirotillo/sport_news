const { errorHandler } = require("../helpers/error_handler");
const Comment = require("../Schema/Comment");
const { commentValidation } = require("../Validations/comments.validation");
const mongoose = require("mongoose");

const addNewComment = async (req, res) => {
  try {
    const {
      comment_id,
      news_id,
      content,
      created_at,
      reply_comment_id,
      is_approved,
      is_deleted,
      views,
      likes,
    } = req.body;
    const newComment = await pool.query(
      `
            INSERT INTO comments(user_id, news_id, content, created_at, reply_comment_id, is_approved, is_deleted, views, likes)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `,
      [
        comment_id,
        news_id,
        content,
        created_at,
        reply_comment_id,
        is_approved,
        is_deleted,
        views,
        likes,
      ]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newComment.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllComments = async (req, res) => {
  try {
    const allComments = await Comment.find({});

    res.status(201).send({ message: "Hama tilar", allComments });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const comment = await Comment.findById(id);
    res.send({ comment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = commentValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { comment } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ comment });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const comment = await Comment.findByIdAndDelete({ _id: id });

    res.send({ comment });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
