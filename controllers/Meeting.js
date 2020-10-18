const db = require("../models");
const { io } = require("../app");
const Meeting = require("../utils/Meeting");

const createMeeting = async (req, res, next) => {
  try {
    const meeting = await db.Meeting.create({
      startExamDate: req.body.startExamDate,
      endExamDate: req.body.endExamDate,
      examType: req.body.examType,
      term: req.body.term,
      year: req.body.year,
      password: req.body.password,
      isPostpone: false,
      teacherId: req.user.teacherId,
      subjectId: req.body.subjectId,
      examId: req.body.examId,
    });

    const newMeeting = await db.Meeting.findOne({
      where: { meetingId: meeting.meetingId },
      include: [db.Subject],
    });

    res.status(201).json({
      status: "success",
      message: "สร้างการนัดหมายสำเร็จ",
      newMeeting,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllMeeting = async (req, res, next) => {
  try {
    const allMeeting = await db.Meeting.findAll({
      where: { teacherId: req.user.teacherId, ...req.query },
      include: [db.Subject],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      allMeeting,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllMeetingInStudent = async (req, res, next) => {
  try {
    const meetings = await db.Student.findOne({
      attributes: ["studentId"],
      where: { studentId: req.user.studentId },
      required: true,
      include: {
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "subjectId",
            "examId",
            "teacherId",
          ],
        },
        model: db.Meeting,
        required: true,
        include: [
          {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            model: db.Exam,
            required: true,
          },
          {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            model: db.Subject,
            required: true,
          },
        ],
      },
    });

    if (!meetings) {
      return res.status(200).json({
        message: "ไม่มีห้องสอบ",
      });
    }

    const allMeeting = meetings.Meetings.map((meeting) => meeting);

    res.status(200).json({
      status: "success",
      allMeeting,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getMeeting = async (req, res, next) => {
  try {
    const target = await db.Meeting.findOne({
      where: { meetingId: req.params.meetingId },
      include: [db.Subject],
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

const updateMeeting = async (req, res, next) => {
  try {
    await db.Meeting.update(req.body, {
      where: { meetingId: req.params.meetingId },
    });

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

    const updatedMeeting = await db.Meeting.findOne({
      where: { meetingId: req.params.meetingId },
      include: [db.Subject],
    });

    students.Students.forEach((student) =>
      new Meeting(updatedMeeting, student).sendPostponeTheExam()
    );

    res.status(200).json({
      status: "success",
      message: "เปลี่ยนแปลงข้อมูลการนัดหมายนี้สำเร็จ",
      updatedMeeting,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteMeeting = async (req, res, next) => {
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

    const meeting = await db.Meeting.findOne({
      where: { meetingId: req.params.meetingId },
      include: [db.Subject],
    });

    students.Students.forEach((student) =>
      new Meeting(meeting, student).sendCancelExam()
    );

    await db.StudentMeeting.destroy({
      where: { meetingId: req.params.meetingId },
    });

    await db.Meeting.destroy({
      where: { meetingId: req.params.meetingId },
    });

    await db.Examination.destroy({
      where: { meetingId: req.params.meetingId },
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
  createMeeting,
  getAllMeeting,
  getAllMeetingInStudent,
  getMeeting,
  updateMeeting,
  deleteMeeting,
};
