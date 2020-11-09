const db = require("../models");
const differenceBy = require("lodash/differenceBy");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Email = require("../utils/Email");

function hashedPassword(password) {
  return bcryptjs.hashSync(password, 12);
}

function generateRandomPassword() {
  return Math.random().toString(32).substr(2, 10);
}

const getAllTeachers = async (req, res, next) => {
  const queryString = req.query;
  try {
    const allTeachers = await db.Teacher.findAll({ where: { ...queryString } });

    res.status(200).json({
      status: "success",
      allTeachers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const registerOne = async (req, res, next) => {
  const { email } = req.body;
  const target = await db.Teacher.findOne({ where: { email: email } });

  if (target) res.status(400).send("บัญชีนี้ถูกสร้างไว้แล้ว");

  const randomPassword = generateRandomPassword();

  const newAccount = await db.Teacher.create({
    ...req.body,
    password: hashedPassword(randomPassword),
  });

  const teacher = {
    teacherId: newAccount.teacherId,
    firstName: newAccount.firstName,
    lastName: newAccount.lastName,
    email: newAccount.email,
    password: randomPassword,
    faculty: newAccount.faculty,
    department: newAccount.department,
  };

  const url = `${req.protocol}://${req.get("host")}`;
  await new Email(teacher, url).sendWelcome();

  res.status(201).json({
    status: "success",
    message: "บัญชีนี้ถูกสร้างเรียบร้อย",
    teacher,
  });
};

const registerMany = async (req, res, next) => {
  try {
    const allTeacher = await db.Teacher.findAll({
      attributes: ["email"],
    });
    let target = differenceBy(req.body, allTeacher, "email");

    if (target === undefined || target.length == 0) {
      return res.status(200).json({
        status: "success",
        message: "มีบัญชีทั้งหมดนี้อยู่แล้ว",
      });
    }

    let newTeacher = [];

    target = target.map((obj) => {
      const randomPassword = generateRandomPassword();
      newTeacher.push({ ...obj, password: randomPassword });
      return { ...obj, password: hashedPassword(randomPassword) };
    });

    const newAccount = await db.Teacher.bulkCreate(target);

    const url = `${req.protocol}://${req.get("host")}`;
    newTeacher.map(
      async (teacher) => await new Email(teacher, url).sendWelcome()
    );

    res.status(201).json({
      status: "success",
      message: "บัญชีนี้ถูกสร้างเรียบร้อย",
      newAccount,
    });
  } catch (error) {}
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const target = await db.Teacher.findOne({ where: { email: email } });

  if (!target) {
    res.status(400).json({
      status: "fail",
      message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
    });
  } else {
    const isCorrectPassword = bcryptjs.compareSync(password, target.password);

    if (isCorrectPassword) {
      const payload = {
        email: target.email,
        teacherId: target.teacherId,
      };
      const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: "7d",
      });

      res.status(200).json({
        message: "เข้าสู่ระบบสำเร็จ",
        token,
        teacher: {
          teacherId: target.teacherId,
          firstName: target.firstName,
          lastName: target.lastName,
          email: target.email,
          faculty: target.faculty,
          department: target.department,
        },
      });
    } else {
      res.status(400).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }
  }
};

const updateMe = async (req, res, next) => {
  try {
    await db.Teacher.update(req.body, {
      where: { teacherId: req.user.teacherId },
    });

    res.status(200).json({
      status: "success",
      message: "อัพเดทข้อมูลผู้ใช้สำเร็จ",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const updatePassword = async (req, res, next) => {
  const { oldPassword, candidateNewPassword } = req.body;
  try {
    const target = await db.Teacher.findOne({
      where: { teacherId: req.user.teacherId },
    });

    const isPasswordMatch = bcryptjs.compareSync(oldPassword, target.password);
    if (!isPasswordMatch) {
      throw "รหัสผ่านเก่าผิด";
    }

    const newPassword = bcryptjs.hashSync(candidateNewPassword, 12);

    await db.Teacher.update(
      { password: newPassword },
      {
        where: { teacherId: req.user.teacherId },
      }
    );

    res.status(200).json({
      status: "success",
      message: "เปลี่ยนแปลงรหัสผ่านสำเร็จ",
      candidateNewPassword,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const target = await db.Teacher.findOne({
      where: { email: email },
    });

    if (!target) throw "อีเมลไม่ถูกต้อง";

    const randomPassword = await generateRandomPassword();
    const hashingPassword = await hashedPassword(randomPassword);

    await db.Teacher.update(
      { password: hashingPassword },
      {
        where: { teacherId: target.teacherId },
      }
    );

    target.password = randomPassword;

    const url = `${req.protocol}://${req.get("host")}`;
    await new Email(target, url).sendForgotPassword();

    res.status(200).json({
      status: "success",
      message: "รหัสผ่านถูกส่งไปยังอีเมลแล้ว",
    });
  } catch (error) {
    res.status(404).send({
      message: error,
    });
  }
};

const deleteTeacher = async (req, res, next) => {
  try {
    await db.Teacher.destroy({
      where: { teacherId: req.params.teacherId },
    });

    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

module.exports = {
  getAllTeachers,
  registerOne,
  registerMany,
  login,
  updateMe,
  updatePassword,
  forgotPassword,
  deleteTeacher,
};
