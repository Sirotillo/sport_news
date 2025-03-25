const { errorHandler } = require("../helpers/error_handler");
const Report = require("../Schema/Report");
const { reportValidation } = require("../Validations/reports.validation");
const mongoose = require("mongoose");

const addNewReport = async (req, res) => {
  try {
    const { report_id, news_id, reason, status, created_at } = req.body;
    const newReport = await pool.query(
      `
            INSERT INTO reports(report_id, news_id, reason, status, created_at)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
            `,
      [report_id, news_id, reason, status, created_at]
    );

    res
      .status(201)
      .send({ message: "Yangi til qoshildi", lang: newReport.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllReports = async (req, res) => {
  try {
    const allReports = await Report.find({});

    res.status(201).send({ message: "Hama tilar", allReports });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getReportById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }
    const report = await Report.findById(id);
    res.send({ report });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateReportById = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = reportValidation(req.body);

    if (error) {
      return errorHandler(error, res);
    }

    const { report } = value;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect ObjectID" });
    }

    res.send({ report });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteReportById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Incorrect bjectID" });
    }

    const report = await Report.findByIdAndDelete({ _id: id });

    res.send({ report });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server xatolik" });
  }
};

module.exports = {
  addNewReport,
  getAllReports,
  getReportById,
  updateReportById,
  deleteReportById,
};
