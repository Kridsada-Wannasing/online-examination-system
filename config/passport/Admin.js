const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../../models");

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
  const targetAdmin = await db.Admin.findOne({
    where: { adminId: payload.adminId },
  });

  if (targetAdmin) done(null, targetAdmin);
  else doNotTrack(null, false);
});

passport.use("admin-jwt", JWTStrategy);
