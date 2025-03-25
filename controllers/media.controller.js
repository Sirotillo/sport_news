const { errorHandler } = require("../helpers/error_handler");
const Media = require("../Schema/Media");
const { mediaValidation } = require("../Validations/media.validation");
const mongoose = require("mongoose");

const addNewMedia = async (req, res) => {
  try {
    const { news_id, media_type, media_url, uploaded_at } = req.body;
    const newMedia = await pool.query(
      `
            INSERT INTO medias(news_id, media_type, media_url, uploaded_at)
            VALUES ($1, $2, $3, $4) RETURNING *
            `,
      [news_id, media_type, media_url, uploaded_at]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newMedia.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllMedias = async (req, res) => {
  try {
    const allMedias = await Media.find({});

    res.status(201).send({ message: "Hama tilar", allMedias });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const media = await Media.findById(id);
    res.send({ media });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = mediaValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { media } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ media });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const media = await Media.findByIdAndDelete({ _id: id });

    res.send({ media });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewMedia,
  getAllMedias,
  getMediaById,
  updateMediaById,
  deleteMediaById,
};
