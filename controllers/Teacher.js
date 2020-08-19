const db = require("../models");
const differenceBy = require("lodash/differenceBy");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passwordGenerator = (params) => {
  params = String(params).substring(9);
  params = bcryptjs.hashSync(params, 12);
  return params;
};

const registerOne = async (req, res, next) => {
  const { teacherId } = req.body;
  const target = await db.Teacher.findOne({ where: { teacherId: teacherId } });

  if (target) res.status(400).json({ message: "บัญชีนี้ถูกสร้างไว้แล้ว" });

  const newAccount = await db.Teacher.create({
    ...req.body,
    password: passwordGenerator(teacherId),
  });

  res.status(201).json({
    status: "success",
    message: "บัญชีนี้ถูกสร้างเรียบร้อย",
    account: newAccount,
  });
};

const registerMany = async (req, res, next) => {
  const allStudent = await db.Teacher.findAll();
  let target = differenceBy(req.body, allStudent, "teacherId");

  target = target.map((obj) => ({
    ...obj,
    password: passwordGenerator(obj.teacherId),
  }));

  const newAccount = await db.Teacher.bulkCreate(target);

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

const getMe = (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports = {
  registerOne,
  registerMany,
  login,
  getMe,
};
