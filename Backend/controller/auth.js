const userAuth = require('../models/auth')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: "pradhansm2025.katargam@gmail.com",
        pass: "zgfghsolksmyxhje",
    },
});

const sendMail = async(email) => {
    const info = await transporter.sendMail({
        from: 'pradhansm2025.katargam@gmail.com',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?", 
        html: "<b>Hello world?</b>", // HTML version of the message
        // attachments : "",  // file upload of image
    });

    console.log("Message sent:", info.messageId);
}

exports.register = async(req,res)=>{
  try{
     const registerUser = req.body
     registerUser.password = await bcrypt.hash(registerUser.password, 10)
     
     const registerSuccess = await userAuth.create(registerUser)
     sendMail(registerSuccess.email)
     
     res.status(201).json({
        status: 'Register Sucess',
        message: 'Account created',
        data: registerSuccess
     })
  }
  catch(err){
    res.status(400).json({
        status: 'Fail',
        message: err.message
    })
  }
}

exports.login = async(req,res)=>{
    try{
        const verify = await userAuth.findOne({username: req.body.username})
           if(!verify) throw new Error('Invalid username');

        const pass = await bcrypt.compare(req.body.password, verify.password)
           if(!pass) throw new Error('Invalid Password')

        res.status(200).json({
            status: 'Login success',
            message: 'Welcome back',
            data: verify
        })
    }
    catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}

exports.getDataAuth = async(req,res)=>{
    try {
        const allData = await userAuth.find()
        res.status(200).json({
            status: 'Success',
            message: 'allData fetch success',
            data: allData
        })
    } catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: error.message
        })
    }
}