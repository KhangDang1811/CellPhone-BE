import React, { useState } from 'react';
import './Signup.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {SignupUser} from '../../actions/UserAction'
import {EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'


function Login(props) {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => {
        if(password === confirmPassword) {
            dispatch(SignupUser(data))            
        } else{
            alert("🤣 Mật khẩu không trùng khớp kìa ông ơi")
        }
      //   if(password === confirmPassword && password.length >= 8) {
      //     dispatch(SignupUser(data))            
      // } else if(password.length < 8){
      //     alert("password must be at least 8 characters")
      // }else{
      //     alert("wrong repeat password")
      // }
    }

    const [state, setState] = useState(false)
    const [state1, setState1] = useState(false)
    const show = () =>{
      setState(!state)
    }
    const show1 = () =>{
      setState1(!state1)
    }
   
    const user = useSelector((state) => state.userSignup);
   
    const { userInfo, error } = user;
   
    return (
      <div className="signup-page">
        <h2>ĐĂNG KÍ</h2>
        <form onSubmit={handleSubmit(onSubmit)} 
        classname="form-signup">
          <input {...register("name")} placeholder="Name" required></input>
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            required
          ></input>
           {error ? <p className='errors'>❎😅 {error}</p> : <></>}
          <input
           className={{positon: 'relative'}}
            {...register("password",{required:true, minLength: 8})}
            placeholder="Password"
            type={state? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            // required
            onKeyPress={(e) => {if(!e.key.match(/[a-zA-Z0-9]/)) e.preventDefault()}}
          ></input>
           <button className='show_hide_signup' onClick={() => show()}>
            {
                state ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
        </button>
          <input
           className={{positon: 'relative'}}
            {...register("repeat password")}
            placeholder=" Repeat password"
            type={state1? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            onKeyPress={(e) => {if(!e.key.match(/[a-zA-Z0-9]/)) e.preventDefault()}}
          ></input>
          <button className='show_hide_signup' onClick={() => show1()}>
            {
                state1 ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
        </button>
          <input type="submit" value="Đăng Kí"></input>
        </form>
        {
            errors.password && errors.password.type === "minLength" && <p className="errors">❎😅 Password must be at least 8 characters</p>
          }
      </div>
    );
}

export default Login;