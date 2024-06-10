
import passport from "passport";
import express from "express";
const router = express.Router();

import {
    loginSuccess,
}
from "../controllers/authController.js";


router.get('/google',
    passport.authenticate('google', { scope: ['profile'], session: false }));
    router.get(
        "/google/callback",
        passport.authenticate("google", { session: false }),
        (req, res) => {
          // Kiểm tra xem req.user có chứa thông tin người dùng hay không
          if (!req.user) {
            return res.status(401).json({ error: "Authentication failed" });
          }
          res.redirect(`${process.env.URL_CLIENT}/login/${req.user.id}`);
        }
      );
//   router.get('/google/callback', (req ,res, next) => {
//     passport.authenticate('google', (err, profile) => {
//         req.user = profile
//         next()
//     })(req, res, next)
//   }, (req, res) => {
//     res.redirect(`${process.env.URL_CLIENT}/login/${req.user?.id}`)
//   })
    // { failureRedirect: '/login' }),
    // function(req, res) {
    //   // Successful authentication, redirect home.
    //   res.redirect('/');
    // });

router.post('login-success',loginSuccess)

export default router