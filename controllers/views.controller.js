const { errorHandler } = require("../helpers/error_handler");
const View = require("../Schema/View");
const { viewValidation } = require("../Validations/views.validation");
const mongoose = require("mongoose");

const addNewView = async (req, res) => {
  try {
    const { news_id, view_id, viewed_at } = req.body;
    const newView = await pool.query(
      `
            INSERT INTO views(news_id, view_id, viewed_at)
            VALUES ($1, $2, $3) RETURNING *
            `,
      [news_id, view_id, viewed_at]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newView.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllViews = async (req, res) => {
  try {
    const allViews = await View.find({});

    res.status(201).send({ message: "Hama tilar", allViews });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getViewById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const view = await View.findById(id);
    res.send({ view });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateViewById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = viewValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { view } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ view });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteViewById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const view = await View.findByIdAndDelete({ _id: id });

    res.send({ view });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewView,
  getAllViews,
  getViewById,
  updateViewById,
  deleteViewById,
};
