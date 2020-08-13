const db = require("../models");
const { Op } = require("sequelize");

const createExamInSubject = async (req, res, next) => {
  const newExam = await db.Exam.create({
    subjectId: req.params.subjectId,
    teacherId: req.teacher.teacherId,
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    message: "สร้างชุดข้อสอบสำเร็จ",
    newExam,
  });
};

const addQuestionInExam = async (req, res, next) => {
  const { questionType, tagId } = req.body;
  delete req.body.questionType;
  delete req.body.tagId;

  const mapOfTagId = tagId.map((id) => ({
    tagId: id,
    questionType: questionType,
  }));

  //ถ้าเป็นปรนัย
  if (questionType === "Objective") {
    await db.ObjectiveQuestion.create(req.body);
    await db.QuestionExam.create({
      questionType: questionType,
      examId: req.params.examId,
    });
    await db.QuestionTag.bulkCreate(mapOfTagId);
  }
  //ถ้าเป็นอัตนัย
  else if (questionType === "Subjective") {
    await db.SubjectiveQuestion.create(req.body);
    await db.QuestionExam.create({
      questionType: questionType,
      examId: req.params.examId,
    });
    await db.QuestionTag.bulkCreate(mapOfTagId);
  }
  //ถ้าไม่ตรงเงื่อนไขใดๆเลย
  else {
    res.status(400).json({
      status: "fail",
      message: "สร้างคำถามไม่สำเร็จ",
    });
  }

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
          model: db.ObjectiveQuestion,
          include: {
            model: db.ObjectiveAnswer,
            required: false,
          },
          required: false,
        },
        {
          model: db.SubjectiveQuestion,
          include: {
            model: db.SubjectiveAnswer,
            required: false,
          },
          required: false,
        },
      ],
      required: false,
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
  //ถ้าเป็นปรนัย
  if (req.body.questionType === "Objective") {
    await db.ObjectiveQuestion.update(req.body, {
      where: { questionId: req.params.questionId },
    });
  }
  //ถ้าเป็นอัตนัย
  else if (req.body.questionType === "Subjective") {
    await db.SubjectiveQuestion.update(req.body, {
      where: { questionId: req.params.questionId },
    });
  }
  //ถ้าไม่ตรงเงื่อนไขใดๆเลย
  else {
    res.status(400).json({
      status: "fail",
      message: "แก้ไขคำถามไม่สำเร็จ",
    });
  }
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
