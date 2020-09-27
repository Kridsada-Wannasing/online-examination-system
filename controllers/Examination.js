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
    const examination = await db.Examination.findOne({
      where: { examinationId: req.params.examinationId },
    });

    res.status(201).json({
      status: "success",
      examination,
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
    const examinationsForInvitedStudent = await db.Examination.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: db.Meeting,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        required: true,
        include: [
          {
            model: db.StudentMeeting,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            where: {
              studentId: req.user.studentId,
            },
            required: true,
          },
          { model: db.Subject, required: true },
        ],
      },
    });

    const examinationOfToday = examinationsForInvitedStudent.filter(
      (examination) =>
        examination.startDate.getDate() == new Date().getDate() &&
        examination.startDate.getMonth() == new Date().getMonth() &&
        examination.startDate.getFullYear() == new Date().getFullYear()
    );

    res.status(200).json({
      status: "success",
      examinationsForInvitedStudent,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const enterToExamination = async (req, res, next) => {
  console.log(req.headers);
  const { password } = req.body;
  console.log(password);
  try {
    const getExamination = await db.Examination.findOne({
      where: { examinationId: req.params.examinationId },
    });

    if (getExamination) {
      let passwordIsCorrect = getExamination.password == password;
      console.log(passwordIsCorrect);

      if (passwordIsCorrect) {
        res.status(200).json({
          status: "success",
          examId: getExamination.examId,
        });
      } else {
        res.status(400).json({
          status: "fail",
          message: "รหัสผ่านผิด",
        });
      }
    } else throw "ไม่มีห้องสอบนี้แล้ว";
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
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
