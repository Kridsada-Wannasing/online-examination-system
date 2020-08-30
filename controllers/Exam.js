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

const getAllExam = async (req, res, next) => {
  //ส่ง query string มาเพื่อ get ข้อมูลออกไปตาม field ที่กำหนด
  const queryString = req.query;
  try {
    const allExam = await db.Exam.findAll({
      //ชุดข้อสอบของตัวเองหรือชุดข้อสอบที่ให้สิทธิ์การเข้าถึงเป็น Public
      where: {
        [Op.or]: [{ teacherId: req.user.teacherId }, { authority: true }],
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
      include: {
        model: db.QuestionExam,
        include: {
          model: db.Question,
          include: [db.Choice],
        },
      },
    });

    if (!target) res.status(404).send("หาข้อมูลไม่พบ");

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
      status: "succes",
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
    await db.QuestionExam.destroy({
      where: {
        examId: req.params.examId,
      },
    });
    await db.Exam.destroy({
      where: {
        examId: req.params.examId,
      },
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
  getAllExam,
  getExam,
  updateExam,
  deleteExam,
};
