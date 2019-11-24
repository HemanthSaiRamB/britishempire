// dependencies
const express = require('express')
const mongoose = require('mongoose')
const log = require("log");
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const app = express()
// const fs = require('fs');



// Bodyparser

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/json' }))

// Express Session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

// Passport middleware
app.use(passport.initialize());
// app.use(passport.session());

// Passport Config
require('./config/passport')(passport)

// DB config
const db = require('./config/keys').MongoUri

// Connect to Mongo
mongoose.connect(db,
  { 
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // sslValidate: true,
    // sslCA:[fs.readFileSync("rds-combined-ca-bundle.pem")]
  })
.then(()=>console.log('connected to mongo db'))
.catch(err=>console.log(err))


//custom Middleware for logging the each request going to the API
app.use((req,res,next) => {
    if (req.body) log.info(req.body);
    if (req.params) log.info(req.params);
    if(req.query) log.info(req.query);
    log.info(`Received a ${req.method} request from ${req.ip} for                ${req.url}`);
  next();
});


//Routes
app.all('/*',require('./routes/index'))


// Server config col
const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`server started on ${PORT}`))

