import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendLink } from '../../actions/UserAction'
import { useForm } from "react-hook-form";
import './EmailForgot.css'

function EmailForgot() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    const dispatch = useDispatch()

    const submit = (data) => {
        dispatch(sendLink(data))
        alert("🤣 Vui lòng kiểm tra email để lấy lại mật khẩu")
    }

    const user = useSelector((state) => state.userSignup);
    const { userInfo, error } = user;
    
    return (
        <div class="login-page">
             <a href="https://www.facebook.com/dangchauhoangkhang/"></a>
        <h2> FORGOT PASSWORD </h2>
       
             <form class="form-login" onSubmit={handleSubmit(submit)}>

          <input  placeholder="Email" required
            {...register("email")}
            type="email"
          ></input>
           {error ? <p className='errors'>❎😅 {error}</p> : <></>}
          <input type="submit" value="SUBMIT"
          ></input>
          </form>
        </div>
    )
}

export default EmailForgot
