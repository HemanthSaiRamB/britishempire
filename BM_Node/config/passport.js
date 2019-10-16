const pp_jwt = require('passport-jwt');
const Strategy = pp_jwt.Strategy;
const ExtractJwt = pp_jwt.ExtractJwt;
const secret = require('./keys').secret
const mongoose = require('mongoose');
const UserModel = require('../models/Users');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};
//this sets how we handle tokens coming from the requests that come
// and also defines the key to be used when verifying the token.
module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
             UserModel.findById(payload._id)
                 .then(user => {
                     if(user){
                       return done(null, {
                           _id: user._id,
                           name: user.name,
                           email: user.email,
                       });
                     }
                     return done(null, false);
                  }).catch(err => console.error(err));
              })
           );
     };