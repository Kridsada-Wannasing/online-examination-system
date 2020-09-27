const db = require("../models");
const { Op } = require("sequelize");

const createExam = async (req, res, next) => {
  try {
    const newExam = await db.Exam.create({
      subjectId: req.body.subjectId,
      teacherId: req.user.teacherId,
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      message: "สร้างชุดข้อสอบสำเร็จ",
      newExam,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const duplicateExam = async (req, res, next) => {
  try {
    const newDuplicateExam = await db.Exam.create(req.body);

    res.status(200).json({
      status: "success",
      newDuplicateExam,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllExam = async (req, res, next) => {
  //ส่ง query string มาเพื่อ get ข้อมูลออกไปตาม field ที่กำหนด
  const queryString = req.query;
  try {
    const allExam = await db.Exam.findAll({
      //ชุดข้อสอบของตัวเองหรือชุดข้อสอบที่ให้สิทธิ์การเข้าถึงเป็น Public
      where: {
        [Op.or]: [{ teacherId: req.user.teacherId }, { authority: true }],
        subjectId: req.params.subjectId,
        ...queryString,
      },
    });

    res.status(200).json({
      status: "success",
      allExam,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getExam = async (req, res, next) => {
  try {
    const target = await db.Exam.findOne({
      where: { examId: req.params.examId },
    });

    if (!target) return res.status(404).send("หาข้อมูลไม่พบ");

    res.status(200).json({
      status: "success",
      target,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const updateExam = async (req, res, next) => {
  try {
    const updatedExam = await db.Exam.update(req.body, {
      where: { examId: req.params.examId },
    });

    res.status(200).json({
      status: "success",
      message: "เปลี่ยนแปลงข้อมูลชุดข้อสอบนี้สำเร็จ",
      updatedExam,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteExam = async (req, res, next) => {
  try {
    await db.Exam.destroy({
      where: { examId: req.params.examId },
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

module.exports = {
  createExam,
  duplicateExam,
  getAllExam,
  getExam,
  updateExam,
  deleteExam,
};
