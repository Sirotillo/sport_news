const { addNewReport, getAllReports, getReportById, updateReportById, deleteReportById } = require("../controllers/reports.controller");

const router = require("express").Router();

router.post("/", addNewReport);

router.get("/", getAllReports);

router.get("/:id", getReportById);

router.put("/:id", updateReportById);

router.delete("/:id", deleteReportById);

module.exports = router;
