const db = require("../models");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const target = await db.Admin.findOne({ where: { email: email } });

  if (!target) {
    return res.status(400).json({
      status: "fail",
      message: "เข้าสู่ระบบล้มเหลว",
    });
  } else {
    const isCorrectPassword = password == target.password;

    if (isCorrectPassword) {
      const payload = {
        email: target.email,
        adminId: target.adminId,
      };
      const token = jwt.sign(payload, process.env.SECRET_OR_KEY, {
        expiresIn: "7d",
      });

      res.status(200).json({
        message: "เข้าสู่ระบบสำเร็จ",
        token,
        admin: {
          firstName: target.firstName,
          lastName: target.lastName,
          email: target.email,
        },
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
  login,
  getMe,
  updateMe,
};
