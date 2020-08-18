const db = require("../models");
const { Op } = require("sequelize");
const pick = require("lodash/pick");

const mapArrayOfObject = function (arrOfObj, id) {
  return arrOfObj.map((obj) => ({
    questionId,
    ...obj,
  }));
};

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

const addQuestionInExam = async (req, res, next) => {
  const question = pick(req.body, ["question", "questionType", "level"]);

  const newQuestion = await db.Question.create(question);
  await db.QuestionExam.create({
    examId: req.params.examId,
    questionId: newQuestion.questionId,
  });

  const choice = mapArrayOfObject(req.body.choice, newQuestion.questionId);
  const tag = mapArrayOfObject(req.body.tag, newQuestion.questionId);
  const answer = mapArrayOfObject(req.body.answer, newQuestion.questionId);

  await db.Choice.bulkCreate(choice);
  await db.QuestionTag.bulkCreate(tag);
  await db.Answer.bulkCreate(answer);

  res.status(201).json({
    status: "success",
    message: "สร้างคำถามเรียบร้อย",
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
      include: [
        {
          model: db.Question,
          include: [db.Answer],
        },
      ],
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

const editQuesitonInExam = async (req, res, next) => {
  const { question, questionType, level } = req.body;
  const updateQuestion = await db.Question.update(
    {
      question,
      questionType,
      level,
    },
    {
      where: { questionId: req.params.questionId },
    }
  );

  await db.Choice.update(req.body.choice, {
    where: { choiceId: req.params.choiceId },
  });
  await db.Question.update(req.body, {
    where: { questionId: req.params.questionId },
  });

  res.status(200).json({
    status: "success",
    message: "แก้ไขคำถามสำเร็จ",
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
  addQuestionInExam,
  getAllExam,
  getExam,
  updateExam,
  editQuesitonInExam,
  deleteExam,
};
