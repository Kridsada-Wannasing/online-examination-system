const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../../models");

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
  const targetTeacher = await db.Teacher.findOne({
    where: { teacherId: payload.teacherId },
  });

  if (targetTeacher) done(null, targetTeacher);
  else doNotTrack(null, false);
});

passport.use("teacher-jwt", JWTStrategy);
