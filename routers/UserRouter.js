import express from 'express'
import {getAllUser, registerUser, login, DeleteUser,GoogleLogin, forgotPassword, resetPassword} from '../controllers/UserController.js'
const UserRouter = express.Router()
import {isAuth, isAdmin} from '../untils/until.js'

UserRouter.post('/register', registerUser)
UserRouter.post('/login', login)
UserRouter.post('/google',GoogleLogin)

UserRouter.get('/', getAllUser)
UserRouter.delete('/delete/:id', DeleteUser)

UserRouter.post('/forgotpassword',forgotPassword)
UserRouter.put('/resetpassword',resetPassword)
export default UserRouter
