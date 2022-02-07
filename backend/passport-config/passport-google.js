const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy
const User = require('../models/User')
const mongoose = require('mongoose')

const googleAuthenticate = async (request, accessToken, refreshToken, profile, done) => {
    try {
        const bink = await User.findOne({ googleId: profile.id })
        if (bink === null) {
            console.log("Creating User")
            const user = new User({
                googleId: profile.id
            })
            const newUser = await user.save()
            return done(null, user)
        }
        else {
            console.log("Returning User")
            const user = await User.findOne({ googleId: profile.id })
            return done(null, user)
        }
    } catch(err) {
        res.json({ message: err.message })
    }
}

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  }, 
  googleAuthenticate)
)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser( async (id, done) => {
    return done(null, await getUserById(id))
})