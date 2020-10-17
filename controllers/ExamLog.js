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
  const examLog = await db.ExamLog.findAll({
    where: {
      examId: req.params.examId,
      studentId: req.params.studentId,
    },
    include: {
      model: db.Question,
      where: {
        questionType: "อัตนัย",
      },
      include: [db.Answer],
    },
  });

  res.status(200).json({
    status: "success",
    examLog,
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
