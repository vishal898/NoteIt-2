const User = require("../models/user");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
module.exports = (passport) => {
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (id, done) {
		// User.findById(id, function (err, user) {
		done(null, id);
		// });
	});

	passport.use(
		new GoogleStrategy(
			{
				clientID:
					"454012695094-ee81ef88ch3q4ij4r6el51fvn34hvie3.apps.googleusercontent.com",
				clientSecret: "casob4pGsPYiAsA_CVuhe-HJ",
				callbackURL: "http://localhost:5000/google/callback",
			},
			function (accessToken, refreshToken, profile, cb) {
				//

				User.findOne({ googleID: profile.id }, async (err, user) => {
					if (err) throw err;

					//
					if (user) {
						//
						cb(null, user);
					} else {
						const newUser = new User({
							// googleID: profile.id,
							email: profile.emails[0].value,
							username: profile.displayName,
							// phoneNo: null,
							// username: null,
						});
						await newUser.save();
						//
						cb(null, newUser);
					}
				});
			}
		)
	);
};