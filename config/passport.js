import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import users from '../models/User.js';

// debug: log callbackURL and client ID on startup
console.log('Passport config:', {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
});

// === Google OAuth Strategy ===
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Gunakan URL absolut sesuai yang didaftarkan di Authorized redirect URIs Google Cloud Console
      callbackURL: process.env.GOOGLE_CALLBACK_URL, 
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('GoogleStrategy invoked, profile:', profile);
      try {
        let user = await users.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        const email = profile.emails && profile.emails[0] && profile.emails[0].value;
        if (!email) {
          console.error('Google profile missing email:', profile);
          return done(new Error('No email in Google profile'), false);
        }

        user = await users.findOne({ email });

        if (user) {
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        // generate a dummy password so schema validators are satisfied
        const randomPassword = Math.random().toString(36).slice(-12);
        user = await users.create({
          email,
          googleId: profile.id,
          password: randomPassword,
        });

        return done(null, user);
      } catch (err) {
        console.error('Error in GoogleStrategy verify:', err);
        return done(err, false);
      }       const randomPassword = Math.random().toString(36).slice(-12);
      user = await users.create({ email, googleId: profile.id, password: randomPassword });
    }
  )
);

// === JWT Strategy ===
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secret,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await users.findById(jwt_payload.id);
      
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;