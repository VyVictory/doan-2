import express from "express";
import passport from "passport";
const router = express.Router();


router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));
  
  router.get('/google/callback', (req ,res, next) => {
    passport.authenticate('google', (err, profile) => {
        req.user = profile
        next()
    })
  }, (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login-sucess/${req.user?._id}`)
  })
    // { failureRedirect: '/login' }),
    // function(req, res) {
    //   // Successful authentication, redirect home.
    //   res.redirect('/');
    // });

router.post('login-success',)

export default router