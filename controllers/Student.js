const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Email = require("../utils/Email");
const differenceBy = require("lodash/differenceBy");

function hashedPassword(password) {
  return bcryptjs.hashSync(password, 12);
}

function generateRandomPassword() {
  return Math.random().toString(32).substr(2, 10);
}

const getAllStudents = async (req, res, next) => {
  const queryString = req.query;
  try {
    const allStudents = await db.Student.findAll({ where: { ...queryString } });

    res.status(200).json({
      status: "success",
      allStudents,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const registerOne = async (req, res, next) => {
  try {
    const { studentId } = req.body;
    const target = await db.Student.findOne({
      where: { studentId: studentId },
    });

    if (target) {
      return res.status(400).json({ message: "บัญชีนี้ถูกสร้างไว้แล้ว" });
    }

    const randomPassword = generateRandomPassword();

    const newAccount = await db.Student.create({
      ...req.body,
      password: hashedPassword(randomPassword),
    });

    let student = {
      studentId: newAccount.studentId,
      firstName: newAccount.firstName,
      lastName: newAccount.lastName,
      email: newAccount.email,
      password: randomPassword,
      faculty: newAccount.faculty,
      department: newAccount.department,
    };

    const url = `${req.protocol}://${req.get("host")}/student`;
    new Email(student, url).sendWelcome();

    res.status(201).json({
      status: "success",
      message: "บัญชีนี้ถูกสร้างเรียบร้อย",
      student: {
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
      },
    });
  } catch (error) {
    res.status(201).json({
      status: "fail",
      error,
    });
  }
};

const registerMany = async (req, res, next) => {
  try {
    let studentId = req.body.map((student) => student.studentId);

    const allStudent = await db.Student.findAll({
      attributes: { exclude: ["password"] },
      where: { studentId: studentId },
    });

    let target = differenceBy(req.body, allStudent, "studentId");

    if (target === undefined || target.length == 0) {
      return res.status(200).json({
        status: "success",
        message: "มีบัญชีทั้งหมดนี้อยู่แล้ว",
        allStudent,
      });
    }

    let newStudent = [];

    let createStudents = target.map((obj) => {
      const randomPassword = generateRandomPassword();
      newStudent.push({ ...obj, password: randomPassword });
      return { ...obj, password: hashedPassword(randomPassword) };
    });

    const newAccount = await db.Student.bulkCreate(createStudents);

    const url = `${req.protocol}://${req.get("host")}/student`;
    newStudent.map((student) => new Email(student, url).sendWelcome());

    res.status(201).json({
      status: "success",
      message: "บัญชีนี้ถูกสร้างเรียบร้อย",
      newAccount,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const target = await db.Student.findOne({ where: { email: email } });

  if (!target)
    res.status(400).json({
      status: "fail",
      message: "เข้าสู่ระบบล้มเหลว",
    });
  else {
    const isCorrectPassword = bcryptjs.compareSync(password, target.password);

    if (isCorrectPassword) {
      const payload = {
        email: target.email,
        studentId: target.studentId,
      };
      const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: "7d",
      });

      res.status(200).json({
        message: "เข้าสู่ระบบสำเร็จ",
        token,
        student: {
          studentId: target.studentId,
          firstName: target.firstName,
          lastName: target.lastName,
          email: target.email,
          faculty: target.faculty,
          department: target.department,
        },
      });
    } else res.status(400).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }
};

const updateMe = async (req, res, next) => {
  try {
    const updatedAccount = await db.Student.update(req.body, {
      where: { studentId: req.user.studentId },
    });

    res.status(200).json({
      status: "success",
      message: "เปลี่ยนแปลงข้อมูลบัญชีสำเร็จ",
      student: {
        studentId: updatedAccount.studentId,
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
    const target = await db.Student.findOne({
      where: { studentId: req.user.studentId },
    });

    const isPasswordMatch = bcryptjs.compareSync(oldPassword, target.password);
    if (!isPasswordMatch) {
      throw "รหัสผ่านเก่าผิด";
    }

    const newPassword = bcryptjs.hashSync(candidateNewPassword, 12);

    await db.Student.update(
      { password: newPassword },
      {
        where: { studentId: req.user.studentId },
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
    const target = await db.Student.findOne({
      where: { email: email },
    });

    if (!target) throw "กรอกอีเมลผิดหรือไม่มีอีเมลนี้";

    const randomPassword = generateRandomPassword();
    const hashedPassword = hashedPassword(randomPassword);

    await db.Student.update(
      { password: hashedPassword },
      {
        where: { studentId: req.user.studentId },
      }
    );

    const student = { ...req.user, password: randomPassword };
    const url = `${req.protocol}://${req.get("host")}/student`;
    await new Email(student, url).sendForgotPassword();

    res.status(200).json({
      status: "success",
      message: "รหัสผ่านถูกส่งไปยังอีเมลแล้ว",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

module.exports = {
  getAllStudents,
  registerOne,
  registerMany,
  login,
  updateMe,
  updatePassword,
  forgotPassword,
};
