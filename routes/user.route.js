const express = require('express');
const { UserController } = require('../controllers/user.controller');
const passport = require('passport');
const userRouter = express.Router();

userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);

// social routes
userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
userRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = req.user.generateAuthToken();
        res.header('x-auth-token', token).redirect('http:/localhost:3000/auth/google/callback?token='+token);
    });

userRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
userRouter.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => {
        const token = req.user.generateAuthToken();
        res.header('x-auth-token', token).redirect(`http://localhost:3000/auth/facebook/callback?facebookToken=${token}`);
    });

module.exports = { userRouter }