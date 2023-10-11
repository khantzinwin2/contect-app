import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../features/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { addUser} from '../features/authSlice';



const Login = () => {
  const [email,setEmail] = useState("minthiha@gmail.com");
  const [password,setPassword] = useState("asdffdsa");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async(e)  =>{
    e.preventDefault();
    const {data} = await login({email,password});
    console.log(data)
    if(data?.success) navigate("/")
    dispatch(addUser(data))
  }
  return (
    <div className='w-full h-screen  flex items-center justify-center'>
        <form onSubmit={loginHandler} className=' flex flex-col gap-3 items-center  bg-gray-50 shadow-lg p-10'>
          <h1 className=' text-blue-500 text-xl font-bold my-2'>Login Account</h1>
        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" placeholder='Ener your email address' className=' w-72   outline-none bg-transparent border-b-2 py-3' />
        <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Ener your password' className=' w-72 outline-none bg-transparent border-b-2 py-3' />
        <div className=' flex flex-col my-4 items-center'>
        <small>Don't have an account?</small>
        <Link to={"/register"}>
        <span className=' text-green-500 cursor-pointer'>Register</span>
        </Link>
        <button type="submit" className=' bg-blue-400 py-2 mt-2 px-10 rounded text-white cursor-pointer'>Login</button>
        </div>
        </form>
    </div>
  )
}

export default Login