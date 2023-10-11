import React, { useState } from 'react'
import {AiFillContacts} from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { useChangePasswordMutation, useLogoutMutation } from '../features/authApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
 
const Nav = () => {
  const user =  JSON.parse(Cookies.get("user"));
  const token =  Cookies.get("token");
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [current_password, setCurrent_password] = useState("asdfjkl;");
  const [password, setPassword] = useState("asdffdsa");
  const [password_confirmation, setPassword_confirmation] = useState("asdffdsa");
  const [changeOldPassword] = useChangePasswordMutation();


  // console.log(JSON.parse(user))
  const logoutHandler = async() =>{
    const data = await logout(token);
    navigate("/login")
    Cookies.remove("user")
    Cookies.remove("token")
    console.log(data)
  }

  const changePassword = async(e)=>{
    e.preventDefault;
    const data = await changeOldPassword({token,password:{current_password,password,password_confirmation}})
    console.log(data)
    if(data?.data?.success){
    logoutHandler()
    }
    
  }

  return (
    <div>
        <nav>
            <div className=' flex  justify-between'>
                <div className=' flex items-center gap-3'>
                <AiFillContacts/>
                <h1>Recontact</h1>
                </div>
            <div className=' flex gap-3 items-center'>
                <div className='flex flex-col '>
                <p>{user?.name}</p>
                <p>{user?.email}</p>
                </div>
                    
<button onClick={() => setShow(true) } data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-5" type="button">
  Change Password
</button>

<div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`fixed top-0 left-0 right-0 z-50 ${!show && 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" onClick={()=>setShow(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                <form  onSubmit={(e)=> e.preventDefault()} id='passwordForm' className="space-y-6" >
                <div>
                        <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                        <input value={current_password} onChange={(e) => setCurrent_password(e.target.value)} type="password" name="currentPassword" id="currentPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="*******" required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)}  type="password" name="password" id="password1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="*******" required/>
                    </div>
                    <div>
                        <label htmlFor="passwordConfirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirmation</label>
                        <input value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)}  type="password" name="passwordConfirmation" id="passwordConfirmation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="*******" required/>
                    </div>
                    <button onClick={changePassword} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 uppercase">Change Password</button>
                </form>
            </div>
        </div>
    </div>
</div> 
                <button onClick={logoutHandler} className=' bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-700 '>Logout</button>
            </div>
          </div>
           
        </nav>
    </div>
  )
}

export default Nav