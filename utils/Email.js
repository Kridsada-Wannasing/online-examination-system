const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const ejs = require("ejs");

module.exports = class Email {
  constructor(
    user,
    url,
    object /*object ของ score meeting หรือ user ที่อัพเดทข้อมูลแล้ว ที่รับเข้ามาเป็นค่าเริ่มต้น*/
  ) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.object = object;
    this.from = `Kridsada Wannasing <${process.env.EMAIL_FROM}>`;
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
      firstName: this.firstName,
      url: this.url,
      object: this
        .object /*object ของ score meeting หรือ user ที่อัพเดทข้อมูลแล้ว*/,
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

  async sendWelcome() {
    await this.send("welcome", "สมัครสมาชิกสำเร็จ");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "้ตั้งค่ารหัสผ่านใหม่");
  }

  async sendUpdatePassword() {
    await this.send("updatePassword", "้เปลี่ยนแปลงรหัสผ่าน");
  }

  async sendUpdateMe() {
    await this.send("updateMe", "เปลี่ยนแปลงข้อมูลผู้ใช้");
  }

  async sendScoreResult() {
    await this.send("scoreResult", "แจ้งผลคะแนนสอบ");
  }

  async sendMeeting() {
    await this.send("meeting", "นัดหมายการสอบ");
  }

  async sendUpdateMeeting() {
    await this.send("updateMeeting", "เลื่อนการสอบ");
  }
};
