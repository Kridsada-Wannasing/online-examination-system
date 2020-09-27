const db = require("../models");

const getAllRegistrations = async (req, res, next) => {
  const queryString = req.query;
  try {
    const allRegistrations = await db.Registration.findAll({
      where: { ...queryString },
    });

    res.status(200).json({
      status: "success",
      allRegistrations,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const createRegistrations = async (req, res, next) => {
  try {
    const newRegistrations = await db.Registration.bulkCreate(req.body);

    res.status(201).json({
      status: "success",
      message: "ข้อมูลถูกสร้างเรียบร้อย",
      newRegistrations,
    });
  } catch (error) {
    res.status(201).json({
      status: "fail",
      error,
    });
  }
};

const getRegistration = async (req, res, next) => {
  try {
    const target = await db.Registration.findOne({
      where: { studentId: req.params.registrationId },
    });

    if (!target) throw "ไม่มีการลงทะเบียนนี้";

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

const updateRegistration = async (req, res, next) => {
  try {
    const updateRegistration = await db.Registration.update(req.body, {
      where: { registrationId: req.params.registrationId },
    });

    res.status(200).json({
      status: "success",
      message: "เปลี่ยนแปลงข้อมูลสำเร็จ",
      updateRegistration,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const deleteRegistration = async (req, res, next) => {
  try {
    await db.Registration.destroy({
      where: { registrationId: req.params.registrationId },
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
  createRegistrations,
  getAllRegistrations,
  getAllRegistrations,
  getRegistration,
  updateRegistration,
  deleteRegistration,
};
