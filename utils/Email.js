const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const ejs = require("ejs");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
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
    await this.send("welcome", "ยินดีต้อนรับ");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "้ตั้งค่ารหัสผ่านใหม่");
  }

  async sendUpdatePassword() {
    await this.send("passwordReset", "้เปลี่ยนแปลงรหัสผ่าน");
  }
};
