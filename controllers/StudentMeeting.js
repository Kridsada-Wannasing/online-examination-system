const db = require("../models");
const Meeting = require("../utils/Meeting");

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

    const meeting = await db.Meeting.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "subjectId"] },
      where: {
        meetingId: req.body[0].meetingId,
      },
      include: [db.Subject],
    });

    students.forEach((student) =>
      new Meeting(meeting, student).sendScheduleAnExam()
    );

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
    const students = await db.Meeting.findOne({
      attributes: ["meetingId"],
      where: {
        meetingId: req.params.meetingId,
      },
      include: {
        model: db.Student,
        attributes: { exclude: ["createdAt", "updatedAt", "password"] },
      },
    });

    res.status(200).json({
      status: "success",
      students: students.Students,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteStudentInMeeting = async (req, res, next) => {
  try {
    await db.StudentMeeting.destroy({
      where: {
        meetingId: req.params.meetingId,
        studentId: req.params.studentId,
      },
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
