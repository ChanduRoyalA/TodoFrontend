import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const LoginPage = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [status, setstatus] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setstatus(true)
        const response = await fetch(`https://todobackend-6hfe.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            })
        })

        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
            toast.success(data.message)
            Cookies.set("userId", data.token, { expires: 10 })
            navigate('/home')
        }
        else {
            toast.error(data.message)
            setusername('');
            setpassword('')
            setstatus(false)
        }
    }
    const token = Cookies.get("userId");
    if (token !== undefined) {
        return <Navigate to="/home" />;
    }
    return (
        <div className=' h-screen bg-gray-200  flex  justify-center items-center'>
            <div className='h-auto w-1/4 bg-white shadow-2xl rounded-lg p-6 flex flex-col gap-2'>
                <h1 className='font-bold text-base'>Login</h1>
                <input type='text' placeholder='UserName' className='rounded-lg my-1 border-black focus:outline-none bg-slate-200 w-full px-3 py-1' onChange={(e) => { setusername(e.target.value) }} value={username} />
                <input type='password' placeholder='Password' className='rounded-lg my-1 border-black focus:outline-none bg-slate-200 w-full px-3 py-1' onChange={(e) => { setpassword(e.target.value) }} value={password} />
                {
                    status ? <div className='flex justify-center bg-white py-1 my-2'><span className="loading loading-dots loading-md text-green-400 "></span></div> : <button className=' bg-green-600 text-white py-1 my-2 rounded-lg' onClick={handleLogin}>Login</button>
                }
                <Link to='/signup' className='text-sm self-end'><p >Already have an Account <span className='underline'>Login?</span></p></Link>
            </div>
        </div>
    )
}

export default LoginPage