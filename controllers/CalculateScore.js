const db = require("../models");

module.exports = async (req, res, next) => {
  try {
    const getYourAnswer = await db.ExamLog.findAll({
      attributes: ["questionId", "answer"],
      where: {
        studentId: req.user.studentId,
        examId: req.body.examId,
      },
    });

    //เพื่อนำไป query เอาคำตอบตามแต่ละ questionId
    const uniqueQuestionId = [
      ...new Set(getYourAnswer.map((item) => item.questionId)),
    ];

    const getCorrectAnswer = await db.Answer.findAll({
      attributes: ["questionId", "answer", "score"],
      where: {
        questionId: uniqueQuestionId,
      },
    });

    //จัดรูปจาก arr => obj
    function yourAnswerFormatResult(array) {
      let mapped = {};
      array.map((item) => {
        if (!mapped[item.questionId]) {
          mapped[item.questionId] = [item.answer];
        } else {
          mapped[item.questionId].push(item.answer);
        }
      });

      return mapped;
    }

    //จัดรูปจาก arr => obj
    function correctAnswerFormatResult(array) {
      let mapped = {};
      array.map((item) => {
        const tmp = {
          [item.answer]: item.score,
        };

        if (mapped[item.questionId]) {
          mapped[item.questionId] = {
            ...mapped[item.questionId],
            ...tmp,
          };
        } else {
          mapped[item.questionId] = {
            ...tmp,
          };
        }
      });

      return mapped;
    }

    //เรียกใช้ func สำหรับการแปลง arr => obj
    const yourQuestionIdOfAnswer = yourAnswerFormatResult(getYourAnswer);
    const correctQuestionIdOfAnswer = correctAnswerFormatResult(
      getCorrectAnswer
    );

    //หาคีย์ใน yourQuestionIdOfAnswer ได้ ["1","2"]
    //map หาคีย์ในแต่ละ questionId
    const scoreOfExam = Object.keys(yourQuestionIdOfAnswer).reduce(
      (sumOfScoreOfQuestion, questionId) => {
        //นำ array ที่เก็บค่าของแต่ละ questionId ไปเปรียบเทียบกันกับเฉลย
        const scoreOfQuestion = yourQuestionIdOfAnswer[questionId].reduce(
          (sumOfScoreOfChoice, choice) => {
            //ถ้าแต่ละคีย์ของที่ตอบมาตรงกันกับคีย์ของเฉลยให้บวกคะแนน
            if (
              Object.keys(correctQuestionIdOfAnswer[questionId]).includes(
                choice
              )
            ) {
              sumOfScoreOfChoice +=
                correctQuestionIdOfAnswer[questionId][choice];
            }
            return sumOfScoreOfChoice;
          },
          0
        );

        return (sumOfScoreOfQuestion += scoreOfQuestion);
      },
      0
    );

    req.score = scoreOfExam;

    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
