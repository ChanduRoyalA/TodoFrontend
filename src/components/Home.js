import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import TodoCard from './TodoCard';

export const Home = () => {

    const [dataFetched, setdataFetched] = useState([]);
    const [isData, setisData] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [type, settype] = useState('getAllTodo')

    const navigate = useNavigate();
    const handleSelection = (e) => {
        settype(e.target.value)
    }
    useEffect(() => {
        getData();
    }, [type])


    const userId = Cookies.get("userId");
    if (userId === undefined) {
        return <Navigate to="/login" />;
    }
    const getData = async () => {
        setisLoading(true)
        const response = await fetch(`http://localhost:8080/api/todo/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: userId
            })
        })
        const data = await response.json();
        if (response.status == 200) {
            setdataFetched(data)
            if (data.length > 0) {
                setisData(true)
            }
            else {
                setisData(false)
            }
            setisLoading(false)
        }
        else {
            toast.error("Failed to fetch")
        }
    }
    const handleLogout = () => {
        Cookies.remove("userId");
        navigate('/login')
    }

    const handleMarkAsUnDone = async (id) => {
        const toastId = toast.loading('Making Changes...');
        const response = await fetch(`http://localhost:8080/api/todo/markAsDoneAndUnDone/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId
            })
        })

        const data = await response.json();
        if (response.status === 200) {
            toast.dismiss(toastId)
            toast.success(data.message)
            getData()
        }
    }

    const handleDelete = async (id) => {
        const toastId = toast.loading('Making Changes...');
        const response = await fetch(`http://localhost:8080/api/todo/deleteTodo/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId
            })
        })
        const data = await response.json();
        if (response.status === 200) {
            toast.dismiss(toastId)
            toast.success(data.message)
            getData()
        }
        else {
            toast.error(data.error)
        }

    }
    return (
        <div className=' grid grid-cols-4 h-auto'>
            <div className=' col-span-1  h-screen flex flex-col p-10 gap-4 ' >
                <button className='text-green-400 font-medium text-xl w-full py-2 rounded-lg hover:bg-green-400 hover:text-white'>Home</button>
                <button className='text-green-400 font-medium text-xl w-full py-2 rounded-lg hover:bg-green-400 hover:text-white'>Add Todo</button>
                <button className='text-green-400 font-medium text-xl w-full py-2 rounded-lg hover:bg-green-400 hover:text-white' disabled >My Rooms</button>
                <button className='text-green-400 font-medium text-xl w-full py-2 rounded-lg hover:bg-green-400 hover:text-white' onClick={handleLogout}>Logout</button>
            </div>
            <div className='col-span-3 flex flex-col p-10'>
                <div className='px-4 w-full mb-4 flex justify-between '>
                    <select className='  py-2 rounded-lg w-auto bg-white text-black font-semibold border-2 px-6 border-black focus:outline-none' onChange={handleSelection}>
                        {/* <option select>Select</option> */}
                        <option select={true} value={'getAllTodo'}>All</option>
                        <option value={'getInProgressTodo'}>In Progress</option>
                        <option value={'getHighPriorityTodo'}>High Priority</option>
                        <option value={'getCompletedTodo'}>Completed</option>
                    </select>
                </div>
                {
                    isData ? <>
                        {
                            isLoading ? <div className='flex flex-col justify-center items-center p-10 h-1/2'><span className="loading loading-dots loading-lg text-green-400"></span></div> : <>{dataFetched.map((i) => (
                                <TodoCard data={i} handleMarkAsUnDone={handleMarkAsUnDone} handleDelete={handleDelete} key={i._id} />
                            ))}</>
                        }
                    </> : <div className='flex flex-col justify-center items-center p-10 h-1/2'>
                        <h1>No Items available, Switch to other to see items</h1>
                    </div>
                }
            </div>

        </div>
    )
}


