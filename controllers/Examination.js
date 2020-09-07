const db = require("../models");

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

const enterToExamination = async (req, res, next) => {
  try {
    const { password } = req.body;

    const target = db.Meeting.findOne({
      where: {
        meetingId: req.body.meetingId,
        studentId: req.body.studentId,
      },
    });

    if (!target) {
      res.status(400).json({
        status: "fail",
        message: "ท่านไม่ได้รับอนุญาตให้เข้าห้องสอบนี้",
      });
    }

    const getExamination = db.Examination.findOne({
      where: { examinationId: req.body.examinationId },
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
          allowExamination: true,
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
  enterToExamination,
  updateExamination,
  cancelExamination,
};
