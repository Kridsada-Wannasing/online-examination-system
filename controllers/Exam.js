const db = require("../models");
const { Op } = require("sequelize");
const FilterObject = require("../utils/FilterObject");

const mapArrayOfObject = function (arrOfObj, id) {
  return arrOfObj.map((obj) => ({
    questionId: id,
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
  const newQuestion = await db.Question.create({
    questionType: req.body.questionType,
    question: req.body.question,
    level: req.body.level,
  });
  await db.QuestionExam.create({
    examId: req.params.examId,
    questionId: newQuestion.questionId,
  });

  let choice = mapArrayOfObject(req.body.choice, newQuestion.questionId);
  let tag = mapArrayOfObject(req.body.tag, newQuestion.questionId);
  let answer = mapArrayOfObject(req.body.answer, newQuestion.questionId);

  choice = await db.Choice.bulkCreate(choice);
  tag = await db.QuestionTag.bulkCreate(tag);
  answer = await db.Answer.bulkCreate(answer);

  res.status(201).json({
    status: "success",
    message: "สร้างคำถามเรียบร้อย",
    newQuestion,
    choice,
    tag,
    answer,
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

const editQuesitonInExam = async (req, res, next) => {
  let editedFields = new FilterObject(req.body, req.body.allowedFields);
  const updatedQuestion = await db.Question.update(editedFields, {
    where: { questionId: req.params.questionId },
  });

  const updatedChoice = await db.Choice.update(
    { choice: req.body.choice.choice },
    {
      where: { choiceId: req.params.choiceId },
    }
  );
  const updatedTag = await db.QuestionTag.update(
    { tagId: req.body.tag.tagId },
    {
      where: { questionTagId: req.params.questionTagId },
    }
  );

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
