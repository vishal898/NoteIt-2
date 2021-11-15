const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");


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
		failureRedirect: "https://noteit2021.herokuapp.com/bad",
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		
		res.redirect("https://noteit2021.herokuapp.com/home");
	}
);


router.get("/logout", (req, res) => {
	// req.session = null;
	req.logout();
	req.session.destroy((err) => {
		res.clearCookie("connect.sid");
		// Don't redirect, just print text
		res.redirect("https://noteit2021.herokuapp.com");
	});
});

router.get("/profile", (req, res)=> {
	console.log(req.user);
	User.find({_id:req.user._id},(err,data)=>{
		if(err)throw error;
		console.log(`user from db ${data}`);
		res.status(200).json(data);
	});
});



module.exports = router;