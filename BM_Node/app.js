// dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const app = express()

// Passport Config
require('./config/passport')(passport)

// Bodyparser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Express Session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// DB config
const db = require('./config/keys').MongoUri

// Connect to Mongo
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('connected to mongo db'))
.catch(err=>console.log(err))

//Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

// Server config
const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`server started on ${PORT}`))