const db = require("../models");

const createSubject = async (req, res, next) => {
  const newSubject = await db.Subject.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างรายวิชาสำเร็จ",
    newSubject,
  });
};

const updateSubject = async (req, res, next) => {
  await db.Subject.update(req.body, {
    where: { subjectId: req.params.subjectId },
  });

  res.status(200).json({
    status: "succes",
    message: "เปลี่ยนแปลงข้อมูลรายวิชานี้สำเร็จ",
  });
};

module.exports = {
  createSubject,
  updateSubject,
};
