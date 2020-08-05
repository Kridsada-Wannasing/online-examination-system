const db = require("../models");

const createExam = async (req, res, next) => {
  const newExam = await db.Exam.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างชุดข้อสอบสำเร็จ",
    newExam,
  });
};

const addQuestionInExam = async (req, res, next) => {
  //ถ้าเป็นปรนัย
  if (req.body.questionType === "Objective") {
    const question = await db.ObjectiveQuestion.create(req.body);
    await db.QuestionExam.create({
      objectiveQuestionId: question.objectiveQuestionId,
      examId: req.params.examId,
    });
  }
  //ถ้าเป็นอัตนัย
  else if (req.body.questionType === "Subjective") {
    const question = await db.SubjectiveQuestion.create(req.body);
    await db.QuestionExam.create({
      subjectiveQuestionId: question.subjectiveQuestionId,
      examId: req.params.examId,
    });
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
  const allExam = await db.Exam.findAll({ include: [db.QuestionExam] });

  res.status(200).json({
    status: "success",
    allExam,
  });
};

const getExam = async (req, res, next) => {
  const target = await db.Exam.findOne({
    where: { examId: req.params.examId },
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
  createExam,
  addQuestionInExam,
  getAllExam,
  getExam,
  updateExam,
  deleteExam,
};
