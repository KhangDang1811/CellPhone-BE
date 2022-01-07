import {UserModel} from '../models/UserModel.js'
import {generateToken,generateTokenResetPassword} from '../untils/until.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'

export const getAllUser = (req, res) => {
    UserModel.find({})
        .then(user => res.send(user))
        .catch(err => console.log(err))
}

export const registerUser = expressAsyncHandler(async (req, res) => {
    // const user = new UserModel({
    //     // _id: req.body._id,
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     address: '',
    //     phone: '',
    //     isAdmin: false,
    // })
    //const createUser = user.save();
   
    // res.send({
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     password: user.password,
    //     address: user.address ,
    //     phone: user.phone,
    //     token: generateToken(user),
    // });

    const existUser = await UserModel.findOne({email: req.body.email});
    if (existUser) {
        res.status(401).send({message: " email already exist"});
    }
    else {
        const user = new UserModel({
            _id: req.body._id,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            address: '',
            phone: '',
            profilepicture: '',
            isAdmin: false,
        })
        const createUser = user.save();
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            address: user.address ,
            phone: user.phone,
            profilepicture: user.profilepicture,
            token: generateToken(user),
        });
    }

})

export const GoogleLogin = expressAsyncHandler(async (req, res) => {
    //console.log(req.body);
    const existUser = await UserModel.findOne({email: req.body.email,password: req.body.password});
    const user1 = await  UserModel.findOne({email: req.body.email})
    if (existUser) {
       // res.status(401).send({message: " email already exist"});
       res.send({
        _id: user1._id,
        name: user1.displayName || user1.name,
        email: user1.email,
        password: user1.password,
        address: user1.address ,
        phone: user1.phone,
        profilepicture: user1.photoURL || user1.profilepicture,
        isAdmin: user1.isAdmin,
        token: generateToken(user1),
    });
    }
    else {
        const user = new UserModel({
            _id: req.body._id,
            name: req.body.displayName,
            email: req.body.email,
            password: req.body.apiKey,
            address: '',
            phone: '',
            profilepicture: req.body.photoURL,
            isAdmin: false,
        })
        const createUser = user.save();
        res.send({
            _id: user._id,
            name: user.displayName || user.name,
            email: user.email,
            password: user.password,
            address: user.address ,
            phone: user.phone,
            profilepicture: user.photoURL || user.profilepicture,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
    }
})

export const login = expressAsyncHandler(async (req, res) => {
    const user1 = await  UserModel.findOne({email: req.body.email, password: req.body.password})
    const user = await  UserModel.findOne({email: req.body.email})
    if(user && bcrypt.compareSync(req.body.password, user.password)){ 
        res.send({
            _id: user._id,
            name: user.name || user.displayName,
            email: user.email,
            password: user.password,
            address: user.address ,
            phone: user.phone,
            isAdmin: user.isAdmin,
            profilepicture: user.profilepicture || user.photoURL,
            token: generateToken(user),
        });
    }else if(user1){
        res.send({
            _id: user._id,
            name: user.name || user.displayName,
            email: user.email,
            password: user.password,
            address: user.address ,
            phone: user.phone,
            isAdmin: user.isAdmin,
            profilepicture: user.profilepicture || user.photoURL,
            token: generateToken(user),
        });
    }
    else{
        res.status(401).send({message: "invalid email or password"})
    }
})

export const DeleteUser = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById({_id: req.params.id})

    if(user){
        await user.remove()
        res.send({message: 'user deleted'})
    }else{
        res.send({message: 'user not exists'})
    }
})

//email link to reset password 
export const forgotPassword = expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findOne({email: req.body.email})
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: "691ff66923d7cd",
          pass: "1cea8294d47aac"
        }
      });
    if(user){
        const token = generateTokenResetPassword(user);
        await user.save();
        const resetUrl = `http://localhost:3000/resetpassword/${token}`;
        const mailOptions = {
            from: process.env.MAIL_FROM, 
            to: `${user.email}`,
            subject: 'Reset Password',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${resetUrl}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        }
       await transport.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err)
            }else{
                console.log(info)
            }
        }
        )
        res.send({message: 'email sent'})
    }else{
        res.status(401).send({message: " email already exist"});
       //res.send({message: 'email not exists'})
    }
})

//update password after reset password link
export const resetPassword = expressAsyncHandler(async (req, res) => {
   // console.log(req.body);
    const user = await UserModel.findOne({email: req.body.email})
    if(user){
        user.password = bcrypt.hashSync(req.body.password, 10),
        await user.save()
        res.send({message: 'password updated'})
    }else{
        res.send({message: 'email not exists'})
    }
})
