const db = require("../models");
const { Op } = require("sequelize/types");

const createExamination = async (req, res, next) => {
  try {
    const newExamination = await db.Examination.create(req.body);

    res.status(201).json({
      status: "success",
      message: "สร้างห้องสอบสำเร็จ",
      newExamination,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllExaminations = async (req, res, next) => {
  try {
    const allExamination = await db.Examination.findAll();

    res.status(201).json({
      status: "success",
      allExamination,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getExamination = async (req, res, next) => {
  try {
    const allExamination = await db.Examination.findOne({
      where: { examinationId: req.params.examinationId },
    });

    res.status(201).json({
      status: "success",
      allExamination,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getExaminationsForInvitedStudent = async (req, res, next) => {
  try {
    const examinationsForInvitedStudent = await db.Meeting.findAll({
      include: [db.Examination],
      where: {
        [Op.and]: [
          { studentId: req.user.studentId },
          sequelize.where(
            sequelize.fn("DATE", sequelize.col("startDate")),
            sequelize.literal("CURRENT_DATE")
          ),
        ],
      },
    });

    res.status(200).json({
      status: "success",
      examinationsForInvitedStudent,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const enterToExamination = async (req, res, next) => {
  try {
    const { password, examinationId } = req.body;

    const getExamination = db.Examination.findOne({
      where: { examinationId: examinationId },
    });

    if (getExamination) {
      let passwordIsCorrect = password.localeCompare(getExamination.password);
      let currentTime = new Date().getTime();
      let startTime = new Date(getExamination.startDate).getTime();
      let endTime = new Date(getExamination.endDate).getTime();

      if (
        passwordIsCorrect == 0 &&
        currentTime >= startTime &&
        currentTime <= endTime
      ) {
        res.status(200).json({
          status: "success",
          examId: getExamination.examId,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "รหัสผ่านผิดหรืออาจหมดเวลาเข้าห้องสอบแล้ว",
    });
  }
};

const updateExamination = async (req, res, next) => {
  try {
    const updateExamination = await db.Examination.update(req.body, {
      where: { examinationId: req.params.examinationId },
    });

    res.status(204).json({
      status: "success",
      message: "เปลี่ยนแปลงข้อมูลสำเร็จ",
      updateExamination,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const cancelExamination = async (req, res, next) => {
  try {
    await db.Examination.destroy({
      where: { examinationId: req.params.examinationId },
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
  createExamination,
  getAllExaminations,
  getExamination,
  getExaminationsForInvitedStudent,
  enterToExamination,
  updateExamination,
  cancelExamination,
};
