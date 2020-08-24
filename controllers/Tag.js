const db = require("../models");

const createTag = async (req, res, next) => {
  try {
    const newTag = await db.Tag.create(req.body);

    res.status(201).json({
      status: "success",
      message: "สร้างป้ายระบุสำเร็จ",
      newTag,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getAllTag = async (req, res, next) => {
  try {
    const allTag = await db.Tag.findAll();

    res.status(200).json({
      status: "success",
      allTag,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getTag = async (req, res, next) => {
  try {
    const target = await db.Tag.findOne({
      where: { tagId: req.params.tagId },
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

const updateTag = async (req, res, next) => {
  try {
    await db.Tag.update(req.body, {
      where: { tagId: req.params.tagId },
    });

    res.status(200).json({
      status: "succes",
      message: "เปลี่ยนแปลงป้ายระบุนี้สำเร็จ",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteTag = async (req, res, next) => {
  try {
    await db.Tag.destroy({
      where: { tagId: req.params.tagId },
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
  createTag,
  getAllTag,
  getTag,
  updateTag,
  deleteTag,
};
