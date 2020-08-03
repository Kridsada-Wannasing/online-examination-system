const db = require("../models");

const createMeeting = async (req, res, next) => {
  const newMeeting = await db.Meeting.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างการนัดหมายสำเร็จ",
    newMeeting,
  });
};

const getAllMeeting = async (req, res, next) => {
  const allMeeting = await db.Meeting.findAll();

  res.status(200).json({
    status: "success",
    allMeeting,
  });
};

const getMeeting = async (req, res, next) => {
  const target = await db.Meeting.findOne({
    where: { meetingId: req.params.meetingId },
    include: [db.Exam, db.Section, db.Teacher],
  });

  if (!target) {
    res.status(404).json({
      status: "fail",
      message: "ไม่มีการนัดหมายนี้",
    });
  }

  res.status(200).json({
    status: "success",
    target,
  });
};

const updateMeeting = async (req, res, next) => {
  await db.Meeting.update(req.body, {
    where: { meetingId: req.params.meetingId },
  });

  res.status(200).json({
    status: "succes",
    message: "เปลี่ยนแปลงข้อมูลการนัดหมายนี้สำเร็จ",
  });
};

const deleteMeeting = async (req, res, next) => {
  await db.Meeting.destroy({
    where: { meetingId: req.params.meetingId },
  });

  res.status(204).send();
};

module.exports = {
  createMeeting,
  getAllMeeting,
  getMeeting,
  updateMeeting,
  deleteMeeting,
};
