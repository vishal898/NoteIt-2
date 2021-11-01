const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const Tag = require("../models/tag");

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

const isLoggedIn = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		// Unauthorised [to be used during checkout]
		res.sendStatus(401);
	}
};
router.get("/me", (req, res) => {
	// console.log(req.session.passport.user);
	// res.send(req.session.passport.user.username);
	console.log(req.user);
	res.json(req.user);	
	// else res.json({});
});
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:3000/bad",
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect("http://localhost:3000/home");
	}
);

router.get("/logout", (req, res) => {
	// req.session = null;
	req.logout();
	req.session.destroy((err) => {
		res.clearCookie("connect.sid");
		// Don't redirect, just print text
		res.redirect("http://localhost:3000");
	});
});

router.get("/profile", (req, res)=> {
	console.log(req.user);
	res.status(200).json(req.user);
	// User.findOne({ email: req.session.passport.user.email })
	//   .lean()
	//   .exec((err, user) => {
	// 	  console.log(req.session.passport.user);
	// 	  res.status(200).send(req.session.passport.user);
	// 	// if (err) console.log(err);
	// 	// if (user) res.status(200).send(user);
	// 	// else {
	// 	//   res.status(404).send();
	// 	// }
	//   });
});



module.exports = router;