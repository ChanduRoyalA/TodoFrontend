import React from 'react'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Home = () => {

    const getAllTodo = async () => {
        const result = fetch('', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                userId: "userId",
            })

        })
    }
    const token = Cookies.get("userId");
    if (token === undefined) {
        return <Navigate to="/login" />;
    }
    return (
        <div className=' grid grid-cols-4 h-auto'>
            <div className=' col-span-1  h-screen flex flex-col p-10 gap-4 items-center' >
                <button className='text-white font-medium text-xl bg-green-300 w-full py-2 rounded-lg'>Home</button>
                <button className='text-white font-medium text-xl  bg-green-300 w-full py-2 rounded-lg'>Add Todo</button>
                <button className='text-white font-medium text-xl  bg-green-300 w-full py-2 rounded-lg'>My Rooms</button>
                <button className='text-white font-medium text-xl  bg-green-300 w-full py-2 rounded-lg'>Logout</button>
            </div>
            <div className='bg-red-300 col-span-3'>
            </div>
        </div>
    )
}


