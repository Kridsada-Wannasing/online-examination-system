const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const getMe = (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports = {
  login,
  getMe,
};
