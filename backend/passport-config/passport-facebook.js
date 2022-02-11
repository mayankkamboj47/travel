const passport = require('passport')
const FacebookStrategy = require( 'passport-facebook' ).Strategy
const User = require('../models/User')
const mongoose = require('mongoose')

const facebookAuthenticate = async (accessToken, refreshToken, profile, done) => {
    try {
        const bink = await User.findOne({ facebookId: profile.id })
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
            const user = await User.findOne({ facebookId: profile.id })
            return done(null, user)
        }
    } catch(err) {
        res.json({ message: err.message })
    }
}

passport.use(new FacebookStrategy({
    clientID:     process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/facebook/callback"
  }, 
  facebookAuthenticate)
)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser( async (id, done) => {
    return done(null, await getUserById(id))
})