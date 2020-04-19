const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secret
// User Model
const UserModel = require('../models/Users')
// email service
const emailApiKey = require('../config/keys').emailKey
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(emailApiKey);
// register handle
router.post('/register',(req,res)=>{
    var pwdbckp=req.body.password?req.body.password:""
    const {name,age,gender,mobilenumber,email,password,cnfpwd,usertype}=req.body;
    let errors = [];
    var error;
    // check required fields
    if(!name || !age || !gender || !mobilenumber || !email || !password || !cnfpwd){
        errors.push({success:false,code:406,msg:"Please fill in all fields"});
        error = new Error('Please fill in all fields')
        error.name='Not Acceptable,Please fill in all fields'
        error.message = 'Not Acceptable'
        error.httpStatusCode = 406
    }
    // if passwords do not match
   if(password !== cnfpwd){
        errors.push({success:false,code:406,msg:"Password and Confirm Password Do not match"})
        error = new Error('Password and Confirm Password Do not match')
        error.name='Not Acceptable,Password and Confirm Password Do not match'
        error.message = 'Not Acceptable'
        error.httpStatusCode = 406
    }
    // Check Password length
    if(password.length <6){
        errors.push({success:false,code:406,msg:"Password should be 6 charecters strictly"})
        error = new Error('Password should be 6 charecters strictly')
        error.name='Not Acceptable,Password should be 6 charecters strictly'
        error.message = 'Not Acceptable'
        error.httpStatusCode = 406
    }
    // email validation
    var re = /\S+@\S+\.\S+/;
    if(!re.test(email)){
        errors.push({success:false,code:406,msg:"Invalid Email Id"})
        error = new Error('Invalid Email Id')
        error.name='Not Acceptable,Invalid Email Id'
        error.message = 'Not Acceptable'
        error.httpStatusCode = 406
    }
    if(errors.length >0){
        res.status(406).send(error)
    }else{
        UserModel.findOne({email:email}).then(user=>{
            if(user){
                // User Exists 
                errors.push({success:false,code:406,msg:"User Already Exists"})
                error = new Error('User Already Exists')
                error.name='Not Acceptable,User Already Exists'
                error.message = 'Not Acceptable'
                error.httpStatusCode = 406
                res.status(406).send(error)
            }else{
                const newUser = new UserModel({
                    name,
                    age,
                    gender,
                    mobilenumber,
                    email,
                    password,
                    usertype,
                    pwdbckp
                })
                bcrypt.genSalt(10,(err,salt)=>
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        // set password to hash;
                        newUser.password = hash;
                        // save user
                        newUser.save().
                        then((saveres)=>{
                            var userObj ={
                                "usertype": saveres.usertype,
                                "date": saveres.date,
                                "_id": saveres._id,
                                "name": saveres.name,
                                "age": saveres.age,
                                "gender": saveres.gender,
                                "mobilenumber": saveres.mobilenumber,
                                "email": saveres.email,
                            }
                                res.status(200).send({success:true,code:200,msg:usertype+' saved successfully',userObj:userObj})
                        }).catch((err)=>{
                            errors.push({success:false,code:403,msg:err})
                            error = new Error(err)
                            error.name='Forbidden'+err
                            error.message = 'Forbidden'
                            error.httpStatusCode = 403
                            res.status(403).send(error)
                        })
                    })
                )
            }
        })
    }
})

// login handle
router.post('/login',(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;   
    let errors = [];
    var error;
    UserModel.findOne({ email })
         .then(user => {
            if (!user) {
                errors.push({success:false,code:404,msg:"User Does Not Exists"});
                error = new Error('User Does Not Exists')
                error.name='Not Found,User Does Not Exists'
                error.message = 'Not Found'
                error.httpStatusCode = 404
                res.status(404).send(error)
           }else{
                    bcrypt.compare(password, user.password)
                    .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                        _id: user._id,
                        name: user.userName
                        };
                        jwt.sign(payload, secret, { expiresIn: 360000 },
                                (err, token) => {
                                if (err) res.status(500)
                                .json({
                                    success:false,
                                    error: "Error signing token",
                                        raw: err }); 
                                        UserModel
                                        .findOneAndUpdate(
                                            {'email':email},
                                            {cloudToken:req.body.cloudToken}, 
                                            {upsert:false}).
                                            then((cloudTokenUpdated)=>{
                                                res.json({ 
                                                    usertype:user.usertype,
                                                    id:user._id,
                                                    name:user.name,
                                                    email:user.email,
                                                    age:user.age,
                                                success: true,
                                                token: `Bearer ${token}` });
                                        })
                        });      
                } else {
                    errors.push({success:false,code:400,msg:"Password Incorrect"});
                    error = new Error('Password Incorrect')
                    error.name='Bad Request,Password Incorrect'
                    error.message = 'Bad Request'
                    error.httpStatusCode = 400
                    res.status(400).send(error)
        }
        }).catch(err=>{
            console.log(err)
        })
           }
        
    }).catch(err=>{
        console.log(err)
    })
})

//logout handle

router.get('/logout', (req,res)=>{
    req.logOut()
    res.send({code:200,msg:'your are logged out'})
})
// User Verification for forgot pwd
router.post('/verify',(req,res)=>{
    const {email,mobilenumber} = req.body;
    let errors = [];
    var error;
    UserModel.findOne({ email }).then(user=>{
        if(!user){
            errors.push({success:false,code:404,msg:"User Does Not Exists"});
            error = new Error('User Does Not Exists')
            error.name='Not Found,User Does Not Exists'
            error.message = 'Not Found'
            error.httpStatusCode = 202
            error.success=false
            res.status(202).send(error)
        }else{
            if(user.mobilenumber===mobilenumber){
                const msg = {
                    to: user.email,
                    from: 'britishempirefuels7@gmail.com',
                    subject: 'British Empire Fuels(confidential)',
                    text: `Hi ${user.name} please find your password here..thank you`,
                    // html: `<p>hi <b>${user.name}</b> please find your password here..thank you</p><p><strong>${user.pwdbckp}</strong></p>`,
                    html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                    <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                        <head>
                          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                          <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                        
                          <style type="text/css">
                        body, p, div {
                          font-family: arial,helvetica,sans-serif;
                          font-size: 14px;
                        }
                        body {
                          color: #000000;
                        }
                        body a {
                          color: #1188E6;
                          text-decoration: none;
                        }
                        p { margin: 0; padding: 0; }
                        table.wrapper {
                          width:100% !important;
                          table-layout: fixed;
                          -webkit-font-smoothing: antialiased;
                          -webkit-text-size-adjust: 100%;
                          -moz-text-size-adjust: 100%;
                          -ms-text-size-adjust: 100%;
                        }
                        img.max-width {
                          max-width: 100% !important;
                        }
                        .column.of-2 {
                          width: 50%;
                        }
                        .column.of-3 {
                          width: 33.333%;
                        }
                        .column.of-4 {
                          width: 25%;
                        }
                        @media screen and (max-width:480px) {
                          .preheader .rightColumnContent,
                          .footer .rightColumnContent {
                            text-align: left !important;
                          }
                          .preheader .rightColumnContent div,
                          .preheader .rightColumnContent span,
                          .footer .rightColumnContent div,
                          .footer .rightColumnContent span {
                            text-align: left !important;
                          }
                          .preheader .rightColumnContent,
                          .preheader .leftColumnContent {
                            font-size: 80% !important;
                            padding: 5px 0;
                          }
                          table.wrapper-mobile {
                            width: 100% !important;
                            table-layout: fixed;
                          }
                          img.max-width {
                            height: auto !important;
                            max-width: 100% !important;
                          }
                          a.bulletproof-button {
                            display: block !important;
                            width: auto !important;
                            font-size: 80%;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                          }
                          .columns {
                            width: 100% !important;
                          }
                          .column {
                            display: block !important;
                            width: 100% !important;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                            margin-left: 0 !important;
                            margin-right: 0 !important;
                          }
                          .social-icon-column {
                            display: inline-block !important;
                          }
                        }
                      </style>
                        </head>
                        <body>
                          <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
                            <div class="webkit">
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                                <tr>
                                  <td valign="top" bgcolor="#FFFFFF" width="100%">
                                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td width="100%">
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                              <td>
                                                <!--[if mso]>
                        <center>
                        <table><tr><td width="600">
                      <![endif]-->
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                          <tr>
                                                            <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                        <tr>
                          <td role="module-content">
                            <p>cHeErs!!</p>
                          </td>
                        </tr>
                      </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="545a2e16-0bd8-4412-95d0-cb2bb36cde7f" data-mc-module-version="2019-10-22">
                        <tbody>
                          <tr>
                            <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">Hi, <b>${user.name}</b> &nbsp;</div><div></div></div></td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="82459c1a-2097-48ab-b1a3-a43a14a10bb1" data-mc-module-version="2019-10-22">
                        <tbody>
                          <tr>
                            <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">Visit our website here <a href="https://britishempirefuels.com/" title="https://britishempirefuels.com/">https://britishempirefuels.com</a></div><div></div></div></td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="fc856660-9cdc-4245-940a-e9f019db9114">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                              <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="5px" style="line-height:5px; font-size:5px;">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 5px 0px;" bgcolor="#000000"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="89547baa-23a0-4a06-832f-ab19384ef711">
                        <tbody>
                          <tr>
                            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                              <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/fb64968b8257cf1d/d77c7584-fe3e-4be6-9291-459907d68472/342x66.png">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b3b8b62b-f78f-4b48-9b58-268cfda27a85" data-mc-module-version="2019-10-22">
                        <tbody>
                          <tr>
                            <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">Your password Here, ${user.pwdbckp}</div><div></div></div></td>
                          </tr>
                        </tbody>
                      </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a target="_blank" class="Unsubscribe--unsubscribeLink zzzzzzz" href="{{{unsubscribe}}}" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>
                                                          </tr>
                                                        </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </center>
                        </body>
                      </html>`
                };
                  sgMail.send(msg);
                  res.status(200).send({name:'Please Check your email in private for the password',success:true,httpStatusCode:200})
            }else{
                errors.push({success:false,code:404,msg:"User Verification failed,Email and Phone Number Does Not Match"});
                error = new Error('User Does Not Exists')
                error.name='User Verification failed,Email and Phone Number Does Not Match'
                error.message = 'Not Found'
                error.httpStatusCode = 202 
                error.success=false
                res.status(202).send(error)
            }
        }
    })
})
module.exports = router;
