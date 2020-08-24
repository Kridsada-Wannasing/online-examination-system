const db = require("../models");
const { Op } = require("sequelize");

const createExamInSubject = async (req, res, next) => {
  const newExam = await db.Exam.create({
    subjectId: req.params.subjectId,
    teacherId: req.user.teacherId,
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    message: "สร้างชุดข้อสอบสำเร็จ",
    newExam,
  });
};

const getAllExam = async (req, res, next) => {
  const allExam = await db.Exam.findAll({
    //ชุดข้อสอบของตัวเองหรือชุดข้อสอบที่ให้สิทธิ์การเข้าถึงเป็น Public
    where: {
      [Op.or]: [{ teacherId: req.user.teacherId }, { authority: true }],
    },
  });

  res.status(200).json({
    status: "success",
    allExam,
  });
};

const getExam = async (req, res, next) => {
  const target = await db.Exam.findOne({
    where: { examId: req.params.examId },
    include: {
      model: db.QuestionExam,
      include: {
        model: db.Question,
        include: [
          { model: db.Choice },
          { model: db.Answer },
          {
            model: db.QuestionTag,
            include: [db.Tag],
          },
        ],
      },
    },
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

const updateExam = async (req, res, next) => {
  await db.Exam.update(req.body, {
    where: { examId: req.params.examId },
  });

  res.status(200).json({
    status: "succes",
    message: "เปลี่ยนแปลงข้อมูลชุดข้อสอบนี้สำเร็จ",
    updatedExam,
  });
};

const deleteExam = async (req, res, next) => {
  await db.Exam.destroy({
    where: { examId: req.params.examId },
  });

  res.status(204).send();
};

module.exports = {
  createExamInSubject,
  getAllExam,
  getExam,
  updateExam,
  deleteExam,
};
