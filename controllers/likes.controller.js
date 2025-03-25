const { errorHandler } = require("../helpers/error_handler");
const Like = require("../Schema/Like");
const { likeValidation } = require("../Validations/likes.validation");
const mongoose = require("mongoose");

const addNewLike = async (req, res) => {
  try {
    const { news_id, like_id, liked_at } = req.body;
    const newLike = await pool.query(
      `
            INSERT INTO likes(news_id, like_id, liked_at)
            VALUES ($1, $2, $3) RETURNING *
            `,
      [news_id, like_id, liked_at]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newLike.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllLikes = async (req, res) => {
  try {
    const allLikes = await Like.find({});

    res.status(201).send({ message: "Hama tilar", allLikes });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getLikeById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const like = await Like.findById(id);
    res.send({ like });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateLikeById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = likeValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { like } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ like });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteLikeById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const like = await Like.findByIdAndDelete({ _id: id });

    res.send({ like });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewLike,
  getAllLikes,
  getLikeById,
  updateLikeById,
  deleteLikeById,
};
