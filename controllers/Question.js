const db = require("../models");

const mapObjectInArray = (array, questionId) => {
  return array.map((obj) => ({ ...obj, questionId }));
};

const createQuestion = async (req, res, next) => {
  try {
    const newQuestion = await db.Question.create(req.body.question);

    await db.QuestionExam.create({
      examId: req.body.question.examId,
      questionId: newQuestion.questionId,
    });
    const newChoices = await db.Choice.bulkCreate(
      mapObjectInArray(req.body.choices, newQuestion.questionId)
    );
    const newAnswers = await db.Answer.bulkCreate(
      mapObjectInArray(req.body.answers, newQuestion.questionId)
    );
    const newTagsInQuestion = await db.QuestionTag.bulkCreate(
      mapObjectInArray(req.body.tags, newQuestion.questionId)
    );

    newQuestion.choices = await newChoices;
    newQuestion.answers = await newAnswers;
    newQuestion.tags = await newTagsInQuestion;

    // if (req.file === undefined) {
    //   return res.status(201).json({
    //     status: "success",
    //     message: "สร้างคำถามสำเร็จ",
    //     newQuestion: newQuestion,
    //   });
    // }

    // const newImage = await db.Image.create({
    //   questionId: newQuestion.questionId,
    //   type: req.file.mimetype,
    //   name: req.file.originalname,
    //   path: req.file.filename,
    // });

    // newQuestion.image = newImage;

    res.status(201).json({
      status: "success",
      message: "สร้างคำถามสำเร็จ",
      newQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllQuestion = async (req, res, next) => {
  //ส่ง query string มาเพื่อ get ข้อมูลออกไปตาม field ที่กำหนด
  const queryString = req.query;
  console.log(queryString);
  try {
    const allQuestion = await db.Question.findAll({ where: queryString });

    res.status(200).json({
      status: "success",
      allQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getQuestion = async (req, res, next) => {
  try {
    const target = await db.Question.findOne({
      where: { questionId: req.params.questionId },
      include: [
        {
          model: db.Choice,
        },
        {
          model: db.Image,
        },
        {
          model: db.Answer,
        },
        {
          model: db.QuestionTag,
          include: [db.Tag],
        },
      ],
    });

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

const updateQuestion = async (req, res, next) => {
  try {
    const updatedQuestion = await db.Question.update(req.body, {
      where: { questionId: req.params.questionId },
    });

    res.status(200).json({
      status: "success",
      message: "แก้ไขคำถามสำเร็จ",
      updatedQuestion,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    await db.Question.destroy({
      where: { questionId: req.params.questionId },
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
  createQuestion,
  getAllQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
