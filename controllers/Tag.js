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

module.exports = {
  createTag,
};
