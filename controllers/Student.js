const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Email = require("../utils/Email")

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

const updateMe = (req, res, next) => {
  try {
    await db.Student.update(req.body, {
      where: { studentId: req.user.studentId },
    })

    res.status(200).json({
      status: "success",
      message: "เปลี่ยนแปลงข้อมูลบัญชีสำเร็จ"
    })
  } catch (error) {
    res.status(400).json({ 
      status:"fail",
      error
    });
  }
};

const updatePassword = (req, res, next) => {
  const { password } = req.body
  try {
    const updatePassword = bcryptjs.hashSync(password, target.password);

    const target = await db.Student.update({ password: updatePassword },{
      where: { studentId: req.user.studentId },
    })

    res.status(200).json({
      status: "success",
      message: "เปลี่ยนแปลงรหัสผ่านสำเร็จ"
    })

  } catch (error) {
    res.status(400).json({ 
      status:"fail",
      error
    });
  }
};

const forgotPassword = (req, res, next) => {
  const { email } = req.body
  try {
    const target = await db.Student.findOne({
      where: { email: email },
    })

    if(!target) throw false

    const randomPassword = Math.random().toString(32).substr(2, 10)

    await db.Student.update({ password: randomPassword },{
      where: { studentId: req.user.studentId },
    })

    const student = req.user
    const url = `${req.protocol}://${req.get("host")}/`;
    await new Email(student, url).sendForgotPassword();

    res.status(200).json({
      status: "success",
      message: "รหัสผ่านถูกส่งไปยังอีเมลแล้ว"
    })

  } catch (error) {
    if(!error) res.status(404).send("อีเมลไม่ถูกต้อง")
  }
};

module.exports = {
  login,
  getMe,
  updateMe,
  updatePassword,
  forgotPassword,
};
