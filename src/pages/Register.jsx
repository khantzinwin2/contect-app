import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../features/authApi';

const Register = () => {
  const [name,setName] = useState("Min Thiha");
  const [email,setEmail] = useState("minthiha@gmail.com");
  const [password,setPassword] = useState("asdffdsa");
  const [password_confirmation,setPassword_confirmation] = useState("asdffdsa");
  const [error,setError] = useState({});
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    const user = {name,email,password,password_confirmation}
    const data = await registerUser(user);
    setError(data?.error?.data?.errors)
    console.log(data?.error?.data?.errors)
    if(data?.data?.success)navigate("/login")
   
  }

  return (
    <div className='w-full h-screen  flex items-center justify-center '>
    <form onSubmit={onSubmitHandler} className=' flex flex-col gap-3 items-center bg-gray-50 shadow-lg p-10'>
      <h1 className=' text-green-500 text-xl font-bold my-2'>Register Account</h1>
    <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder='Enter your name' className=' w-72 outline-none bg-transparent border-b-2 py-3' />
    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Enter your email address' className=' w-72   outline-none bg-transparent border-b-2 py-3' />
    <small>{error?.email?.map(item=> item)}</small>
    <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Enter your password' className=' w-72 outline-none bg-transparent border-b-2 py-3' />
    <input value={password_confirmation} onChange={(e)=> setPassword_confirmation(e.target.value)} type="password" placeholder='Password comfirmation' className= ' w-72 outline-none bg-transparent border-b-2 py-3' />
    <small>{error?.password?.map(item=> item)}</small>
    <div className=' flex flex-col my-4 items-center'>
    <small>Already have an account?</small>
    <Link to={"/login"}>
    <span className=' text-blue-500 cursor-pointer'>Login</span>
    </Link>
    <button type="submit" className=' bg-green-400 py-2 mt-2 px-10 rounded text-white cursor-pointer'>Register</button>
    </div>
    </form>
</div>
  )
}

export default Register