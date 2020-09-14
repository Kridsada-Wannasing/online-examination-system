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

  const url = `${req.protocol}://${req.get("host")}/teacher`;
  await new Email(teacher, url).sendWelcome();

  res.status(201).json({
    status: "success",
    message: "บัญชีนี้ถูกสร้างเรียบร้อย",
    teacher,
  });
};

const registerMany = async (req, res, next) => {
  const allTeacher = await db.Teacher.findAll();
  let target = differenceBy(req.body, allTeacher, "email");

  let newTeacher = [];

  target = target.map((obj) => {
    const randomPassword = generateRandomPassword();
    newTeacher.push({ ...obj, password: randomPassword });
    return { ...obj, password: hashedPassword(randomPassword) };
  });

  const newAccount = await db.Teacher.bulkCreate(target);

  const url = `${req.protocol}://${req.get("host")}/teacher`;
  // newTeacher.map((teacher) => await new Email(teacher, url).sendWelcome());

  res.status(201).json({
    status: "success",
    message: "บัญชีนี้ถูกสร้างเรียบร้อย",
    newAccount,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const target = await db.Teacher.findOne({ where: { email: email } });

  if (!target) {
    res.status(400).json({
      status: "fail",
      message: "เข้าสู่ระบบล้มเหลว",
    });
  } else {
    const isCorrectPassword = bcryptjs.compareSync(password, target.password);

    if (isCorrectPassword) {
      const payload = {
        email: target.email,
        teacherId: target.teacherId,
      };
      const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: 3600,
      });

      res.status(200).json({
        message: "เข้าสู่ระบบสำเร็จ",
        token,
      });
    } else {
      res.status(400).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }
  }
};

const updateMe = (req, res, next) => {
  try {
    const updatedAccount = db.Teacher.update(req.body, {
      where: { teacherId: req.user.teacherId },
    });

    res.status(204).json({
      status: "success",
      message: "อัพเดทข้อมูลผู้ใช้สำเร็จ",
      teacher: {
        teacherId: updatedAccount.teacherId,
        firstName: updatedAccount.firstName,
        lastName: updatedAccount.lastName,
        email: updatedAccount.email,
        faculty: updatedAccount.faculty,
        department: updatedAccount.department,
      },
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
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const target = await db.Teacher.findOne({
      where: { email: email },
    });

    if (!target) throw false;

    const randomPassword = generateRandomPassword();
    const hashedPassword = hashedPassword(randomPassword);

    await db.Teacher.update(
      { password: hashedPassword },
      {
        where: { teacherId: req.user.teacherId },
      }
    );

    const student = req.user;
    const url = `${req.protocol}://${req.get("host")}/teacher`;
    await new Email(student, url).sendForgotPassword();

    res.status(200).json({
      status: "success",
      message: "รหัสผ่านถูกส่งไปยังอีเมลแล้ว",
    });
  } catch (error) {
    if (!error) res.status(404).send("อีเมลไม่ถูกต้อง");
  }
};

module.exports = {
  registerOne,
  registerMany,
  login,
  updateMe,
  updatePassword,
  forgotPassword,
};
