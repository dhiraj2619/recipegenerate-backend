const passport = require('passport');
const { google_client_id, google_client_secret, facebook_app_id, facebook_client_secret } = require('./config.');
const User = require('../models/user.model');
const googleStrategy = require('passport-google-oauth20').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;

passport.use(new googleStrategy({
    clientID: google_client_id,
    clientSecret: google_client_secret,
    callbackURL: process.env.NODE_ENV === 'production' ? 
        'https://recipegenerate-backend.onrender.com/api/users/google/callback' : 
        'http://localhost:5000/api/users/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            const placeholderPassword = (Math.random() + 1).toString(36).substring(2);
            user = new User({
                googleId: profile.id,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: profile.emails[0].value,
                password: placeholderPassword
            });

            await user.save();
        }
        done(null, user)
    } catch (error) {
        done(error, null)
    }
}));

passport.use(new facebookStrategy({
    clientID: facebook_app_id,
    clientSecret: facebook_client_secret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
            const placeholderPassword = (Math.random() + 1).toString(36).substring(2);
            user = new User({
                facebookId: profile.id,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: profile.emails[0].value,
                password:placeholderPassword
            });
            await user.save();
        }
        done(null, user);
    } catch (error) {
        done(err, null);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});