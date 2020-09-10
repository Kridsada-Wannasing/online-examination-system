const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Email = require("../utils/Email")

function hashedPassword(password) {
  return bcryptjs.hashSync(password, 12);
}

function generateRandomPassword() {
  return Math.random().toString(32).substr(2, 10)
}

const registerOne = async (req, res, next) => {
  const { studentId } = req.body;
  const target = await db.Student.findOne({ where: { studentId: studentId } });

  if (target) res.status(400).json({ message: "บัญชีนี้ถูกสร้างไว้แล้ว" });

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
  }

  const url = `${req.protocol}://${req.get("host")}/student`;
  await new Email(student, url).sendWelcome();

  res.status(201).json({
    status: "success",
    message: "บัญชีนี้ถูกสร้างเรียบร้อย",
    student: {
      studentId: student.studentId,
      firstName: student.firstName,
      lastName: student.lastName,
    }
  });
};

const registerMany = async (req, res, next) => {
  const allStudent = await db.Student.findAll();
  let target = differenceBy(req.body, allStudent, "studentId");

  const url = `${req.protocol}://${req.get("host")}/student`;

  target = target.map((obj) => {
    const randomPassword = generateRandomPassword()
    const newStudent = { ...obj, password: randomPassword }
    await new Email(newStudent, url).sendWelcome();

    return {...obj,password:hashedPassword(randomPassword)}
  });

  const newAccount = await db.Student.bulkCreate(target);

  res.status(201).json({
    status: "success",
    message: "บัญชีนี้ถูกสร้างเรียบร้อย",
    newAccount,
  });
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
  const { oldPassword, candidateNewPassword } = req.body
  try {
    const target = await db.Student.findOne({ where: { studentId: req.user.studentId } })

    const isPasswordMatch = bcryptjs.compareSync(oldPassword, target.password);
    if(!isPasswordMatch) {
      throw "รหัสผ่านเก่าผิด"
    }

    const newPassword = bcryptjs.hashSync(candidateNewPassword, 12);

    await db.Student.update({ password: newPassword },{
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
    const url = `${req.protocol}://${req.get("host")}/student`;
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
  registerOne,
  registerMany,
  login,
  getMe,
  updateMe,
  updatePassword,
  forgotPassword,
};
