const db = require("../models");
// const differenceBy = require("lodash/differenceBy");
// const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const FilterObject = require("../utils/FilterObject");

// const passwordGenerator = (params) => {
//   params = String(params).substring(9);
//   params = bcryptjs.hashSync(params, 12);
//   return params;
// };

// const registerOne = async (req, res, next) => {
//   const { adminId } = req.body;
//   const target = await db.Admin.findOne({ where: { adminId: adminId } });

//   if (target) res.status(400).json({ message: "บัญชีนี้ถูกสร้างไว้แล้ว" });

//   const newAccount = await db.Admin.create({
//     ...req.body,
//     password: passwordGenerator(adminId),
//   });

//   res.status(201).json({
//     status: "success",
//     message: "บัญชีนี้ถูกสร้างเรียบร้อย",
//     account: newAccount,
//   });
// };

// const registerMany = async (req, res, next) => {
//   const allStudent = await db.Admin.findAll();
//   let target = differenceBy(req.body, allStudent, "adminId");

//   target = target.map((obj) => ({
//     ...obj,
//     password: passwordGenerator(obj.adminId),
//   }));

//   const newAccount = await db.Admin.bulkCreate(target);

//   res.status(201).json({
//     status: "success",
//     message: "บัญชีนี้ถูกสร้างเรียบร้อย",
//     newAccount,
//   });
// };

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const target = await db.Admin.findOne({ where: { email: email } });

  if (!target) {
    res.status(400).json({
      status: "fail",
      message: "เข้าสู่ระบบล้มเหลว",
    });
  } else {
    // const isCorrectPassword = bcryptjs.compareSync(password, target.password);
    const isCorrectPassword = password.localeCompare(target.password);

    if (isCorrectPassword) {
      const payload = {
        email: target.email,
        adminId: target.adminId,
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

const updateMe = (req, res, next) => {
  try {
    // const filteredBody = new FilterObject(req.body, "username", "email");
    const updatedAccount = db.Admin.update(req.body, {
      where: { adminId: req.user.adminId },
    });

    res.status(204).json({
      status: "success",
      message: "อัพเดทข้อมูลผู้ใช้สำเร็จ",
      updatedAccount,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

module.exports = {
  registerOne,
  registerMany,
  login,
  getMe,
  updateMe,
};
