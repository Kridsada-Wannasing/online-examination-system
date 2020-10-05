const db = require("../models");

const createStudentInMeeting = async (req, res, next) => {
  try {
    await db.StudentMeeting.bulkCreate(req.body);

    let newStudentInMeeting = req.body.map((student) => student.studentId);

    const students = await db.Student.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      where: {
        studentId: newStudentInMeeting,
      },
    });

    res.status(200).json({
      status: "success",
      message: "เพิ่มนักศึกษาสำหรับนัดหมายการสอบเรียบร้อย",
      students,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllStudentInMeeting = async (req, res, next) => {
  try {
    const allStudentInMeeting = await db.StudentMeeting.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        meetingId: req.params.meetingId,
      },
      include: {
        model: db.Student,
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      },
    });

    let students = allStudentInMeeting.map((student) => student.Student);

    res.status(200).json({
      status: "success",
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteStudentInMeeting = async (req, res, next) => {
  try {
    await db.StudentMeeting.destroy({
      where: { meeting: req.params.meetingId, studentId: req.params.studentId },
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
  createStudentInMeeting,
  getAllStudentInMeeting,
  deleteStudentInMeeting,
};
