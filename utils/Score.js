const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const ejs = require("ejs");

module.exports = class Score {
  constructor(score, student, meeting, subjectName) {
    this.score = score;
    this.student = student;
    this.meeting = meeting;
    this.subjectName = subjectName;
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
      score: this.score.score,
      sum: this.score.sum,
      subjectName: this.subjectName,
      examType: this.meeting.examType,
      term: this.meeting.term,
      year: this.meeting.year,
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

  async sendScore() {
    await this.send("score", "แจ้งผลคะแนนสอบ");
  }
};
