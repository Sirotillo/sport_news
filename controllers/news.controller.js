const { errorHandler } = require("../helpers/error_handler");
const News = require("../Schema/News");
const { newsValidation } = require("../Validations/news.validation");
const mongoose = require("mongoose");

const addNewsNews = async (req, res) => {
  try {
    const { newss_id, category_id, author_id, status, published_at, source } =
      req.body;
    const newsNews = await pool.query(
      `
            INSERT INTO newss(newss_id, category_id, author_id, status, published_at, source)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `,
      [newss_id, category_id, author_id, status, published_at, source]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newsNews.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllNewss = async (req, res) => {
  try {
    const allNewss = await News.find({});

    res.status(201).send({ message: "Hama tilar", allNewss });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const newss = await News.findById(id);
    res.send({ newss });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = newsValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { news } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ news });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const news = await News.findByIdAndDelete({ _id: id });

    res.send({ news });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewsNews,
  getAllNewss,
  getNewsById,
  updateNewsById,
  deleteNewsById,
};
