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
        const response = await fetch(`http://localhost:8080/api/auth/login`, {
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
                <input type='text' placeholder='UserName' className='my-1 border-black focus:outline-none bg-slate-200 w-full px-3 py-1' onChange={(e) => { setusername(e.target.value) }} value={username} />
                <input type='password' placeholder='Password' className='my-1 border-black focus:outline-none bg-slate-200 w-full px-3 py-1' onChange={(e) => { setpassword(e.target.value) }} value={password} />
                <button className=' bg-green-600 text-white py-1 my-2' onClick={handleLogin}> {!status ? 'Login' : "Loading"}</button>
                <Link to='/signup' className='text-sm self-end'><p >Already have an Account <span className='underline'>Login?</span></p></Link>
            </div>
        </div>
    )
}

export default LoginPage