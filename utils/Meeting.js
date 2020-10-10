const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const ejs = require("ejs");
const dayjs = require("dayjs");
const localizedFormat = require("dayjs/plugin/localizedFormat");
require("dayjs/locale/th");

dayjs.extend(localizedFormat);
dayjs.locale("th");

module.exports = class Meeting {
  constructor(meeting, student) {
    this.meeting = meeting;
    this.student = student;
    this.from = `Kridsada Wannasing <${process.env.EMAIL_FROM}>`;
    this.to = student.email;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = await ejs.renderFile(`${__dirname}/../views/${template}.ejs`, {
      firstName: this.student.firstName,
      startExamDate: dayjs(new Date(this.meeting.startExamDate)).format("LLL"),
      examType: this.meeting.examType,
      term: this.meeting.term,
      year: this.meeting.year,
      subjectName: this.meeting.Subject.subjectName,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    this.newTransport().sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      else console.log(info.response);
    });
  }

  async sendScheduleAnExam() {
    await this.send("scheduleAnExam", "นัดหมายการสอบ");
  }

  async sendPostponeTheExam() {
    await this.send("postponeTheExam", "เลื่อนการสอบ");
  }

  async sendCancelExam() {
    await this.send("cancelExam", "ยกเลิกการสอบ");
  }
};
