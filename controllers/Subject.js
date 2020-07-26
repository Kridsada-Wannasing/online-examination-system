const db = require("../models");

const createSubject = async (req, res, next) => {
  const newSubject = await db.Subject.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างรายวิชาสำเร็จ",
    newSubject,
  });
};

const getAllSubject = async (req, res, next) => {
  const allSubject = await db.Subject.findAll();

  res.status(200).json({
    status: "success",
    allSubject,
  });
};

const getSubject = async (req, res, next) => {
  const target = await db.Subject.findOne({
    where: { subjectId: req.params.subjectId },
  });

  if (!target) {
    res.status(404).json({
      status: "fail",
      message: "ไม่มีรายวิชานี้",
    });
  }

  res.status(200).json({
    status: "success",
    target,
  });
};

module.exports = {
  createSubject,
  getAllSubject,
  getSubject,
};
