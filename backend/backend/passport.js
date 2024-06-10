import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';



passport.use(new GoogleStrategy({
    clientID: "1082857622919-qki8gd1e85hnb5n3eoa6ojglsc71741f.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    console.log(profile);
      return cb(err, user);
    // });
  }
));