const db = require("../models");

// const getExaminationsForInvitedStudent = async (req, res, next) => {
//   try {
//     const examinations = await db.StudentMeeting.findAll({
//       attributes: {
//         exclude: ["createdAt", "updatedAt", "studentMeetingId", "meetingId"],
//       },
//       where: {
//         studentId: req.user.studentId,
//       },
//       required: true,
//       include: [
//         {
//           attributes: {
//             exclude: [
//               "createdAt",
//               "updatedAt",
//               "subjectId",
//               "examId",
//               "teacherId",
//             ],
//           },
//           model: db.Meeting,
//           required: true,
//           include: [
//             {
//               attributes: { exclude: ["createdAt", "updatedAt"] },
//               model: db.Exam,
//               required: true,
//             },
//             {
//               attributes: { exclude: ["createdAt", "updatedAt"] },
//               model: db.Subject,
//               required: true,
//             },
//             {
//               attributes: {
//                 exclude: ["createdAt", "updatedAt", "password", "email"],
//               },
//               model: db.Teacher,
//               required: true,
//             },
//           ],
//         },
//       ],
//     });

//     const examinationsForInvitedStudent = examinations.map((examination) => ({
//       meeting: examination.Meeting,
//       subject: examination.Meeting.Subject,
//       exam: examination.Meeting.Exam,
//       teacher: examination.Meeting.Teacher,
//     }));

//     res.status(200).json({
//       status: "success",
//       examinationsForInvitedStudent,
//     });
//   } catch (error) {
//
//     res.status(400).json({
//       status: "fail",
//       error,
//     });
//   }
// };

const enterToExamination = async (req, res, next) => {
  try {
    const { password } = req.body;

    const getExamination = await db.Meeting.findOne({
      where: { meetingId: req.params.meetingId },
    });

    if (!getExamination) throw "ไม่มีห้องสอบนี้แล้ว";

    let passwordIsCorrect = getExamination.password == password;

    if (!passwordIsCorrect) throw "รหัสผ่านผิด";

    let currentDate = new Date().getTime();
    let startDate = new Date(getExamination.startExamDate).getTime();
    let endDate = new Date(getExamination.endExamDate).getTime();

    if (currentDate < startDate) {
      throw "ขณะนี้ยังไม่ถึงเวลาสอบ";
    } else if (currentDate > endDate) {
      // await db.StudentMeeting.destroy({
      //   where: {
      //     studentId: req.user.studentId,
      //     meetingId: req.params.meetingId,
      //   },
      // });
      throw "ขณะนี้หมดเวลาสอบแล้ว";
    } else {
      res.status(200).json({
        status: "success",
        examId: getExamination.examId,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

const updateExamination = async (req, res, next) => {
  try {
    const updateExamination = await db.Examination.update(req.body, {
      where: { examinationId: req.params.examinationId },
    });

    res.status(204).json({
      status: "success",
      message: "เปลี่ยนแปลงข้อมูลสำเร็จ",
      updateExamination,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

const cancelExamination = async (req, res, next) => {
  try {
    await db.Examination.destroy({
      where: { examinationId: req.params.examinationId },
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
  enterToExamination,
  updateExamination,
  cancelExamination,
};
