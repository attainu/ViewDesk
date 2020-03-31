// var {Strategy : google_strategy} = require("passport-google-oauth20");

// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, } = process.env;

// const Student = require("./models/student")

// passport.use(new google_strategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback" //this  is to change, ERROR!!  
//   },
//   async (accessToken, refreshToken, profile, cb) => {
//     await Student.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));