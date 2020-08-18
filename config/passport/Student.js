const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../../models");

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
  const targetStudent = await db.Student.findOne({
    where: { studentId: payload.studentId },
  });

  if (targetStudent) done(null, targetStudent);
  else doNotTrack(null, false);
});

passport.use("student-jwt", JWTStrategy);
