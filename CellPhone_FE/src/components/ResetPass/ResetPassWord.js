import React, { useState } from 'react';
import './Signup.css'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {ResetPass} from '../../actions/UserAction'
import {EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'


function ResetPassWord(props) {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const history = useHistory()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => {
        if(password === confirmPassword) {
            dispatch(ResetPass(data))            
        } else{
            alert("🤣 Mật khẩu không trùng khớp kìa ông ơi")
        }
        //history.push('/login')
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
        <h2>RESET PASSWORD</h2>
        <form onSubmit={handleSubmit(onSubmit)} 
        classname="form-signup">
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
          <input type="submit" value="SUBMIT"></input>
        </form>
        {
            errors.password && errors.password.type === "minLength" && <p className="errors">❎😅 Password must be at least 8 characters</p>
          }
      </div>
    );
}

export default ResetPassWord;