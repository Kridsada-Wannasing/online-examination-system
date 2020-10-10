const db = require("../models");

const getExaminationDate = async (req, res, next) => {
  try {
    const examination = await db.Meeting.findOne({
      attributes: [
        [
          db.Sequelize.fn("DISTINCT", db.Sequelize.col("meetingId")),
          "meetingId",
        ],
      ],
      where: {
        studentId: req.user.studentId,
      },
      limit: 6,
    });

    const uniqueMeetingId = examination.map((item) => item.meetingId);

    const examinationDate = await db.Meeting.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        meetingId: uniqueMeetingId,
      },
      include: [db.Subject],
      order: [["examDate", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      examinationDate,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getPostponeExaminationDate = async (req, res, next) => {
  try {
    const examination = await db.StudentMeeting.findAll({
      attributes: [
        [
          db.Sequelize.fn("DISTINCT", db.Sequelize.col("meetingId")),
          "meetingId",
        ],
      ],
      where: {
        studentId: req.user.studentId,
      },
      limit: 6,
    });

    const uniqueMeetingId = examination.map((item) => item.meetingId);

    const postponeExaminationDate = await db.Meeting.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        meetingId: uniqueMeetingId,
      },
      include: [db.Subject],
      order: [["examDate", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      postponeExaminationDate,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getScoreNotification = async (req, res, next) => {
  try {
    const scoreNotification = await db.Score.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        studentId: req.user.studentId,
      },
      order: [["createdAt", "DESC"]],
      limit: 6,
    });

    res.status(200).json({
      status: "success",
      scoreNotification,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

module.exports = {
  getExaminationDate,
  getPostponeExaminationDate,
  getScoreNotification,
};
