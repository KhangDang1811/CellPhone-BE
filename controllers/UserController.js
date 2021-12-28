import {UserModel} from '../models/UserModel.js'
import {generateToken} from '../untils/until.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs';

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