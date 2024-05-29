require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const TraderModel = require("../models/traderSchema");
const tokenData = require("./token");
const generateDummyPassword = require("./dummyPassword");
const bcrypt = require("bcrypt");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;

        const traderExist = await TraderModel.findOne({ email: email });

        if (traderExist) {
          const existingUser = await TraderModel.findOne({
            $and: [{ googleId: profile.id }, { email: email }],
          });

          if (existingUser) {
            const token = tokenData({
              trader_id: existingUser._id,
              email: existingUser.email,
            });
            done(null, { data: existingUser, token: token });
          } else {
            done(new Error("This account already in use."), null);
          }
        } else {
          const dummyPassword = generateDummyPassword();
          const HashPassword = await bcrypt.hash(dummyPassword, 10);
          const profilePic =
            profile.photos && profile.photos.length > 0
              ? profile.photos[0].value
              : null;

          const newUser = new TraderModel({
            email,
            password: HashPassword,
            googleId: profile.id,
            profile: profilePic,
            isGoogleAccount: true,
          });

          const user = await newUser.save();

          const newToken = tokenData({
            trader_id: user._id,
            email: user.email,
          });

          done(null, { data: user, token: newToken });
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
