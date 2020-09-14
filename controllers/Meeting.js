const db = require("../models");

const createMeeting = async (req, res, next) => {
  try {
    const newMeeting = await db.Meeting.create({
      examDate: req.body.examDate,
      teacherId: req.user.teacherId,
      subjectId: req.body.subjectId,
    });
    const studentMeeting = await db.StudentMeeting.create({
      studentId: req.body.studentId,
      meetingId: newMeeting.meetingId,
    });

    res.status(201).json({
      status: "success",
      message: "สร้างการนัดหมายสำเร็จ",
      meeting: {
        meetingId: newMeeting.meetingId,
        startDate: newMeeting.startDate,
        teacherId: newMeeting.teacherId,
        studentId: studentMeeting.studentId,
        subjectId: newMeeting.subjectId,
      },
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
    const allMeeting = await db.Meeting.findAll();

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
      include: [db.Exam, db.Section, db.Teacher],
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
    const updatedMeeting = await db.Meeting.update(req.body, {
      where: { meetingId: req.params.meetingId },
    });

    res.status(200).json({
      status: "succes",
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
    await db.Meeting.destroy({
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
  getMeeting,
  updateMeeting,
  deleteMeeting,
};
