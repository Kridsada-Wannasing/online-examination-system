const db = require("../models");

const createExamLog = async (req, res, next) => {
  const newExamLog = await db.ExamLog.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างชุดข้อสอบสำเร็จ",
    newExamLog,
  });
};

const getAllExamLog = async (req, res, next) => {
  const allExamLog = await db.ExamLog.findAll();

  res.status(200).json({
    status: "success",
    allExamLog,
  });
};

const getExamLog = async (req, res, next) => {
  const target = await db.ExamLog.findOne({
    where: { examLogId: req.params.examLogId },
  });

  if (!target) {
    res.status(404).json({
      status: "fail",
      message: "ไม่มีชุดข้อสอบนี้",
    });
  }

  res.status(200).json({
    status: "success",
    target,
  });
};

const updateExamLog = async (req, res, next) => {
  await db.ExamLog.update(req.body, {
    where: { examLogId: req.params.examLogId },
  });

  res.status(200).json({
    status: "succes",
    message: "เปลี่ยนแปลงข้อมูลชุดข้อสอบนี้สำเร็จ",
  });
};

const deleteExamLog = async (req, res, next) => {
  await db.ExamLog.destroy({
    where: { examLogId: req.params.examLogId },
  });

  res.status(204).send();
};

module.exports = {
  createExamLog,
  getAllExamLog,
  getExamLog,
  updateExamLog,
  deleteExamLog,
};
