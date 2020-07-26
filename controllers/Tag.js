const db = require("../models");

const createTag = async (req, res, next) => {
  const target = await db.Tag.findOne({ where: { tagName: req.body.tagName } });

  if (target) {
    res.status(400).json({
      status: "fail",
      message: "มีป้ายระบุนี้อยู่แล้ว",
    });
  }

  await db.Tag.create(req.body);

  res.status(201).json({
    status: "success",
    message: "สร้างป้ายระบุสำเร็จ",
  });
};

const getAllTag = async (req, res, next) => {
  const allTag = await db.Tag.findAll();

  res.status(200).json({
    status: "success",
    allTag,
  });
};

const getTag = async (req, res, next) => {
  const target = await db.Tag.findOne({
    where: { tagId: req.params.tagId },
  });

  if (!target) {
    res.status(404).json({
      status: "fail",
      message: "ไม่มีป้ายระบุนี้",
    });
  }

  res.status(200).json({
    status: "success",
    target,
  });
};

const deleteTag = async (req, res, next) => {
  await db.Tag.destroy({
    where: { tagId: req.params.tagId },
  });

  res.status(204).send();
};

module.exports = {
  createTag,
  getAllTag,
  getTag,
  deleteTag,
};
