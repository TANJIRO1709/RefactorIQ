import passport from "passport";

import { Strategy as GitHubStrategy } from "passport-github2";

import User from "../models/User.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,

      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      callbackURL: "/api/auth/github/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          githubId: profile.id,
        });

        if (!user) {
          user = await User.create({
            githubId: profile.id,

            username: profile.username,

            avatar: profile.photos[0].value,
          });
        }

        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});