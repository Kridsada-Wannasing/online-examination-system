const db = require("../models");

const createSubject = async (req, res, next) => {
  try {
    const newSubject = await db.Subject.create(req.body);

    res.status(201).json({
      status: "success",
      message: "สร้างรายวิชาสำเร็จ",
      newSubject,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllSubject = async (req, res, next) => {
  try {
    const allSubject = await db.Subject.findAll();

    res.status(200).json({
      status: "success",
      allSubject,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getSubject = async (req, res, next) => {
  try {
    const target = await db.Subject.findOne({
      where: { subjectId: req.params.subjectId },
      include: {
        model: db.Section,
        required: true,
      },
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

const updateSubject = async (req, res, next) => {
  try {
    const updatedSubject = await db.Subject.update(req.body, {
      where: { subjectId: req.params.subjectId },
    });

    res.status(200).json({
      status: "succes",
      message: "เปลี่ยนแปลงข้อมูลรายวิชานี้สำเร็จ",
      updatedSubject,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteSubject = async (req, res, next) => {
  try {
    await db.Subject.destroy({
      where: { subjectId: req.params.subjectId },
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
  createSubject,
  getAllSubject,
  getSubject,
  updateSubject,
  deleteSubject,
};
