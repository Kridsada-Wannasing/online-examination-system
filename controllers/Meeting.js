const db = require("../models");
const { io } = require("../app");

const createMeeting = async (req, res, next) => {
  try {
    const newMeeting = await db.Meeting.create({
      examDate: req.body.examDate,
      teacherId: req.user.teacherId,
      subjectId: req.body.subjectId,
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

const addInvitedStudent = async (req, res, next) => {
  try {
    const studentMeeting = await db.StudentMeeting.bulkCreate(req.body);

    res.status(201).json({
      status: "success",
      message: "สร้างการนัดหมายสำเร็จ",
      studentMeeting,
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
  addInvitedStudent,
  getAllMeeting,
  getMeeting,
  updateMeeting,
  deleteMeeting,
};
