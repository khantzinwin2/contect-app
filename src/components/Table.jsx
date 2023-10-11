import React, { useEffect, useState } from 'react'
import { useDeleteContactMutation, useGetContactQuery, useGetSingleContactQuery, useUpdateContactMutation } from '../features/contactApi'
import Cookies from 'js-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  addContacts, addUser, removeContact } from '../features/authSlice';

const Table = () => {
    const token = Cookies.get("token");
    const coId = Cookies.get("id");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [id, setId] = useState();
    const data1 = useGetContactQuery(token);
    const contact = data1?.data?.contacts?.data;

    const {data} = useGetSingleContactQuery({id:coId,token});


    // data?.contact;
    useEffect(()=>{
    dispatch(addContacts(data?.contact))

    },[])

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();
    const [sboolean, setSboolean]= useState(false);
    const [show, setShow] = useState(false);
    const [ deleteContact ] = useDeleteContactMutation();
    const [ editContact] = useUpdateContactMutation();

    const sname = Cookies.get("name");
    const semail = Cookies.get("email");
    const sphone = Cookies.get("phone");




    const cookieHandler = () =>{
         setSboolean(true)
       removeContact()
    }
  

    
    const singleContactHandler= (rid)=>{
   
        if(sname == undefined){
            navigate(`/${rid}`)
        }else if(sboolean){
            navigate(`/${rid}`)

        }
    }

    

    const setID = (id)=>{
            setShow(true)
            setName(sname)
            setEmail(semail)
            setPhone(sphone)
       

    }
    
   

    const updateContact = async()=>{
        const data = await editContact({token,contact:{name, email, phone},id:coId})
        console.log(data);
        setShow(false)
    }


  return (
   
<div className="relative overflow-x-auto shadow-md mt-5 sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                </th>
               
            </tr>
        </thead>
            {contact?.map(contact=> 
        <tbody key={contact.id} >
            
                <tr onMouseMove={()=>singleContactHandler(contact.id)}    onMouseEnter={()=>singleContactHandler(contact.id)} onMouseLeave={cookieHandler} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th onMouseMove={()=>singleContactHandler(contact.id)} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {contact.name}
                </th>
                <td onMouseMove={()=>singleContactHandler(contact.id)} className="px-6 py-4">
                {contact.phone}
                </td>
                <td onMouseMove={()=>singleContactHandler(contact.id)} className="px-6 py-4">
                {contact.email}
                </td>
                <td  className="px-6 py-4 text-right">
                <button onClick={()=> setID(contact.id) } onMouseMove={()=>singleContactHandler(contact.id)}   onMouseEnter={()=>singleContactHandler(contact.id)} onMouseLeave={cookieHandler} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className=" text-white hover:text-blue-200" type="button">
                Edit
                </button>
                
                </td>
                <td className="px-6 py-4 text-right">
                    <button onClick={()=> deleteContact({id: contact?.id, token}) }  onMouseEnter={()=>singleContactHandler(contact.id)}  href="#" className="font-medium text-red-600 ">Delete</button>
                </td>
              
            </tr>
          
            
            </tbody>

                )}
            
            
    </table>
    <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`fixed top-0 left-0 right-0 z-50 ${!show && 'hidden'} w-full p-4 text-left overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" onClick={()=>setShow(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Your Profile</h3>
                                <form onSubmit={e => e.preventDefault()}  className="space-y-6" id='editForm'>
                                <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your ame</label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="name" name="name2" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Mya Mya" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)}  type="email" name="email2" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@gmail.com" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                                        <input value={phone} onChange={(e) => setPhone(e.target.value)}  type="phone" name="phone" id="phone2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="09100200300" required/>
                                    </div>
                                    <button  onClick={updateContact} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 uppercase">Edit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
</div>

  )
}

export default Table