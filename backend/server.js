require('dotenv').config()

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('./models/User')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const cors = require('cors')
const initializePassport = require('./passport-config/passport-config')

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}))
initializePassport (
    passport, 
    name => User.findOne({name: name}),
    id => User.findOne({_id: id})
)
require("./passport-config/passport-google")
require("./passport-config/passport-facebook")

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const userRouter = require('./routes/user')
app.use('/user', userRouter)

const hotelRouter = require('./routes/hotel')
app.use('/hotel', hotelRouter)

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a> <a href="/auth/facebook">Authenticate with Facebook</a>')
})

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'profile']}))

app.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/login'
}))

app.get('facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/protected',
    failureRedirect: '/login'
}))

app.get('/login', alreadyLoggedIn, (req, res) => {
    res.send("Login Page")
})

app.post('/login', passport.authenticate('local'), (req, res)=>{
    res.status(200).json(req.user)
})

app.get('/protected', checkAuthenticated, (req, res) => {
    res.send("Hello!")
})

app.post('/register', async (req, res) => {
    console.log('Registering', req.body.name, 'with', req.body.password)
    try {
        if ((await User.findOne({name: req.body.name})) != null) {
            return res.status(400).json({message : 'User already exists'})
        }
        else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                name: req.body.name,
                password: hashedPassword
            })
            const newUser = await user.save()
            console.log('registered')
            res.status(201).json(newUser)
        }
    } catch(err) {
        res.json({ message: err.message })
    }
})

app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

// Login checks
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function alreadyLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/protected')
    }

    next()
}

app.listen(3001, () => console.log('Server Started'))