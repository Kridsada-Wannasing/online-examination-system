const db = require("../models");

const mapArrayOfObject = function (arr, studentId) {
  return arr.map((obj) => ({
    ...obj,
    studentId,
  }));
};

const createExamLog = async (req, res, next) => {
  //map req.body ที่ส่งมาจากหน้าบ้าน ด้วย id ของชุดข้อสอบ คำถามข้อนั้น และผู้เข้าสอบ
  const result = mapArrayOfObject(req.body, req.user.studentId);

  const newExamlog = await db.ExamLog.bulkCreate(result);

  res.status(201).json({
    status: "success",
    newExamlog,
  });
};

const getExamLogOfQuestion = async (req, res, next) => {
  // const questions = await db.QuestionExam.findAll({
  //   attributes: ["questionId"],
  //   where: {
  //     examId: req.params.examId,
  //   },
  // });

  // const searchByQuestions = questions.map(
  //   (question) => question.dataValues.questionId
  // );

  const examLogs = await db.ExamLog.findAll({
    attributes: ["answer", "examLogId"],
    where: {
      examId: req.params.examId,
      studentId: req.params.studentId,
      // questionId: searchByQuestions,
      isChecking: false,
    },
    required: true,
    include: {
      attributes: ["question", "sumScoreQuestion"],
      model: db.Question,
      where: {
        questionType: "อัตนัย",
      },
      required: true,
      include: {
        model: db.Answer,
        attributes: ["answer"],
        required: true,
      },
    },
  });

  const mapOfExamLogs = examLogs.map((examLog) => ({
    examLogId: examLog.examLogId,
    yourAnswer: examLog.answer,
    question: examLog.Question,
    correctAnswer: examLog.Question.Answers.map((answer) => answer.answer),
  }));

  res.status(200).json({
    status: "success",
    examLogs: mapOfExamLogs,
  });
};

const getExamLog = async (req, res, next) => {
  const examLog = await db.ExamLog.findAll({
    where: {
      examId: req.params.examId,
      //passport ของ student เก็บใน req.user.studentId
      studentId: req.user.studentId,
      questionId: req.params.questionId,
    },
  });

  res.status(200).json({
    status: "success",
    examLog,
  });
};

const updateExamLog = async (req, res, next) => {
  await db.ExamLog.destroy({
    where: {
      examId: req.params.examId,
      //passport ของ student เก็บใน req.user.studentId
      questionId: req.params.questionId,
      studentId: req.user.studentId,
    },
  });

  //ไปยัง middleware createExamLog
  next();
};

const deleteExamLog = async (req, res, next) => {
  await db.ExamLog.destroy({
    where: {
      examId: req.params.examId,
      //passport ของ student เก็บใน req.user.studentId
      studentId: req.user.studentId,
    },
  });

  res.status(204).send();
};

module.exports = {
  createExamLog,
  // getAllExamLog,
  getExamLog,
  getExamLogOfQuestion,
  updateExamLog,
  deleteExamLog,
};
