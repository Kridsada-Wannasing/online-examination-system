const db = require("../models");

const mapArrayOfObject = function (arr, examId, questionId, studentId) {
  return arr.map((obj) => ({
    ...obj,
    examId,
    questionId,
    studentId,
  }));
};

const createExamLog = async (req, res, next) => {
  //map req.body ที่ส่งมาจากหน้าบ้าน ด้วย id ของชุดข้อสอบ คำถามข้อนั้น และผู้เข้าสอบ
  const result = mapArrayOfObject(
    req.body,
    req.body.examId,
    req.body.questionId,
    req.user.studentId
  );

  const newExamlog = await db.ExamLog.bulkCreate(result);

  res.status(201).json({
    status: "success",
    newExamlog,
  });
};

const getAllExamLog = async (req, res, next) => {
  const allExamLog = await db.ExamLog.findAll({
    where: {
      examId: req.params.examId,
      //passport ของ student เก็บใน req.user.studentId
      studentId: req.user.studentId,
    },
  });

  res.status(200).json({
    status: "success",
    allExamLog,
  });
};

// const getExamLog = async (req, res, next) => {
//   const target = await db.ExamLog.findOne({
//     where: { examLogId: req.params.examLogId },
//   });

//   if (!target) {
//     res.status(404).json({
//       status: "fail",
//       message: "ยังไม่มีการตอบในข้อนี้",
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     target,
//   });
// };

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
  getAllExamLog,
  // getExamLog,
  updateExamLog,
  deleteExamLog,
};
