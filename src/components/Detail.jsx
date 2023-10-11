import React, { useEffect, useState } from 'react'
import { useDeleteContactMutation, useGetContactQuery, useGetSingleContactQuery, useUpdateContactMutation } from '../features/contactApi'
import Cookies from 'js-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addContacts, addUser } from '../features/authSlice';

const Detail = () => {
    const {id}= useParams();
    console.log(id)
    Cookies.set("id",id)
    const coId = Cookies.get("id");
    const token = Cookies.get("token");
    const {data} = useGetSingleContactQuery({id,token});
    const contact = data?.contact;


    const data1 = useGetContactQuery(token);
     const contacts = data1?.data?.contacts?.data;

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(()=>{
            dispatch(addContacts(data?.contact))
            navigate("/")
    },[])

    useEffect(()=>{
        dispatch(addContacts(data?.contact))
    },[data1])
    console.log(data);

    const showModal = ()=>{ 
        setShow(true)
    }
    
   

    const updateContact = async(e)=>{
        e.preventDefault;
        const data = await editContact({contact:{name, email, phone}, token,id})
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
            {contacts?.map(contact=> 
        <tbody key={contact.id} >
            
                <tr   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {contact.name}
                </th>
                <td className="px-6 py-4">
                {contact.phone}
                </td>
                <td className="px-6 py-4">
                {contact.email}
                </td>
                <td className="px-6 py-4 text-right">
                <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className=" text-white hover:text-blue-200" type="button">
                Edit
                </button>
                
                </td>
                <td className="px-6 py-4 text-right">
                    <button onClick={()=> deleteContact({id: contact?.id, token}) } href="#" className="font-medium text-red-600 ">Delete</button>
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
                                <form onSubmit={(e)=>e.preventDefault()}  className="space-y-6" id='editForm1'>
                                <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="name" name="name" id="name3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Mya Mya" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)}  type="email" name="email" id="email3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@gmail.com" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                                        <input value={phone} onChange={(e) => setPhone(e.target.value)}  type="phone" name="phone" id="phone3" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="09100200300" required/>
                                    </div>
                                    <button  onClick={updateContact} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 uppercase">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
</div>

  )
}

export default Detail