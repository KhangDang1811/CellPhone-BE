import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {authentications} from './fire'

export const SignInGoogle =() => async(dispatch) => {
  const provider = new GoogleAuthProvider();
  const postData = authentications.currentUser
  //const {data} = await axios.post('http://localhost:5000/user/google', postData)
  const Data = {email:postData?.email, password:postData?.auth?.config?.apiKey}
  const {data} = await axios.post('http://localhost:5000/user/google', Data)

    signInWithPopup(authentications, provider)
    .then(result => {
     dispatch({type : 'USER_LOGIN_SUCCESS', payload :data})
     localStorage.setItem('userInfo', JSON.stringify(data)) 
    }
    )
    .catch(error => {
      console.log(error)
      dispatch({type : 'SIGN_IN_GOOGLE_ERROR', payload : error})
    }
    )
    // await axios.post('http://localhost:5000/user/google', postData)
}


export const login = (user) => async (dispatch) => {
    try {
      const {data} = await axios.post('http://localhost:5000/user/login', user)
      console.log(data)
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log(error.response.data.message)
      dispatch({ type: 'USER_LOGIN_FAIL', payload: error.response.data.message });
    }
};

export const sendLink = (user) => async (dispatch) => {
  try {
    const {data} = await axios.post('http://localhost:5000/user/forgotpassword', user)
    dispatch({ type: 'USER_LINK_SUCCESS', payload: data });
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({ type: 'USER_LINK_FAIL', payload: error.response.data.message });
  }
};

export const SignupUser = (user) => async (dispatch) => {
    try {
      const {data} = await axios.post('http://localhost:5000/user/register', user)
      console.log(data)
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: data });
      document.location.href = '/';
    } catch (error) {
      console.log(error.response.data.message)
      dispatch({ type: 'USER_SIGNUP_FAIL', payload: error.response.data.message });
    }
};

export const ResetPass = (user) => async (dispatch) => {
 
  try {
    const {data} = await axios.put('http://localhost:5000/user/resetpassword', user)
    //console.log(data)
    //localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: 'USER_RESETPASS_SUCCESS', payload: data });
  } catch (error) {
    console.log(error.response.data.message)
    dispatch({ type: 'USER_RESETPASS_FAIL', payload: error.response.data.message });
  }
};

export const SignoutUser = (user) => async (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({type: 'USER_SIGNOUT_SUCCESS', payload: {} })
  document.location.href = '/';
};


export const getAllUser = () => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await  axios.get('http://localhost:5000/user')
    console.log(data)
    dispatch({type: 'GET_ALL_USER', payload: data})
  } catch (error) {
    dispatch({type: 'GET_ALL_USER_FAIL', payload: error.message})
  }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
  const {
    userSignin: {userInfo},
  } = getState()
  try {
    const {data} = await axios.delete(`http://localhost:5000/user/delete/${userId}`)
    dispatch({type: 'DELETE_USER', payload: data})
  } catch (error) {
    dispatch({type: 'DELETE_USER_FAIL', error: error.message})
  }
}

