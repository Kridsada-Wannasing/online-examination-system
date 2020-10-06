const db = require("../models");
const fs = require("fs");
const path = require("path");

const getAllImages = async (req, res, next) => {
  try {
    const allImages = await db.Image.findAll();

    res.status(200).json({
      status: success,
      allImages,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const getImage = async (req, res, next) => {
  try {
    const image = await db.Image.findOne({
      where: {
        questionId: req.params.questionId,
      },
    });

    res.status(200).json({
      status: "success",
      image,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const uploadImage = async (req, res, next) => {
  try {
    if (req.file == undefined) {
      return res.status(404).json({
        status: "fail",
        message: "ไม่พบไฟล์รูปภาพ",
      });
    }

    const newImage = await db.Image.create({
      questionId: req.body.questionId,
      type: req.file.mimetype,
      name: req.file.originalname,
      path: req.file.filename,
    });

    res.status(201).json({
      status: "success",
      message: "อัพโหลดรูปภาพสำเร็จ",
      newImage,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const changeImage = async (req, res, next) => {
  try {
    if (req.file == undefined) {
      return res.status(404).json({
        status: "fail",
        message: "ไม่พบไฟล์รูปภาพ",
      });
    }

    // const find = await db.Image.findOne({
    //   where: { questionId: req.params.questionId },
    // });

    // fs.unlinkSync(path.join(__dirname, `public/img/${find.filename}`));

    const updateImage = await db.Image.update(
      {
        type: req.file.mimetype,
        name: req.file.originalname,
        path: req.file.filename,
      },
      {
        where: { questionId: req.body.questionId },
      }
    );

    res.status(201).json({
      status: "success",
      message: "อัพเดทรูปภาพสำเร็จ",
      updateImage,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteImage = async (req, res, next) => {
  try {
    await db.Image.destroy({
      questionId: req.params.questionId,
      type: req.file.mimetype,
      name: req.file.originalname,
      path: req.file.filename,
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
  getImage,
  getAllImages,
  uploadImage,
  changeImage,
  deleteImage,
};
