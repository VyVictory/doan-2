import passport from "passport";
import express from "express";
const router = express.Router();

import {
    loginSuccess,
}
from "../controllers/authController.js";


router.get('/google',
    passport.authenticate('google', { scope: ['profile'], session: false }));
    
        router.get('/google/callback', (req, res ,next) =>{
            passport.authenticate('google',(err, profile) =>{
                req.user = profile
                next()
            })(req, res ,next)
        }, (req, res) => {
            res.redirect(`${process.env.URL_CLIENT}/login/${req.user?.id}`)
        })

        router.post('login-success',loginSuccess)

export default router


// import passport from "passport";
// import express from "express";
// const router = express.Router();

// import {
//     loginSuccess,
// }
// from "../controllers/authController.js";


// router.get('/google',
//     passport.authenticate('google', { scope: ['profile'], session: false }));
//         router.get('/google/callback', (req, res ,next) =>{
//             passport.authenticate('google',(err, profile) =>{
//                 req.user = profile
//                 next()
//             })(req, res ,next)
//         }, (req, res) => {
//             res.redirect(`${process.env.URL_CLIENT}/login/${req.user?.id}`)
//         })

//         router.post('login-success',loginSuccess)

// export default router
    

