import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

export const SignupPage = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [status, setstatus] = useState(false);

    const handleSignup = async () => {
        setstatus(true)
        console.log(username)
        console.log(password)
        const response = await fetch(`http://localhost:8080/api/auth/signup`, {
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
        if (data.status === 200) {
            toast.success('Signuped Successfully')
            return <Navigate to="/home" />
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
                <h1 className='font-bold text-base'>Create Account</h1>
                <input type='text' placeholder='UserName' className='my-1 border-black focus:outline-none bg-slate-200 w-full px-3 py-1' onChange={(e) => { setusername(e.target.value) }} value={username} />
                <input type='password' placeholder='Password' className='my-1 border-black focus:outline-none bg-slate-200 w-full px-3 py-1' onChange={(e) => { setpassword(e.target.value) }} value={password} />
                <button className=' bg-green-600 text-white py-1 my-2' onClick={handleSignup}> {!status ? 'Signup' : "Loading"}</button>
                <Link to='/login' className='text-sm self-end'><p >Already have an Account <span className='underline'>Login?</span></p></Link>
            </div>
        </div>
    )
}
