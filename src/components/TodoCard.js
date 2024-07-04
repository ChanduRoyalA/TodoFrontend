import React from 'react'
import { MdDone } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import CountdownTimer from './CountdownTimer';
import { RxCross2 } from "react-icons/rx";


const TodoCard = (props) => {
    const { data, handleMarkAsUnDone, handleDelete } = props
    const { completed, deadline, text, title, _id } = data
    const date = new Date(deadline)
    const dateNow = new Date()
    const totalDays = ((date - dateNow) / (1000 * 3600 * 24))
    const days = Math.floor(totalDays);
    const hours = Math.floor((totalDays - days) * 24);
    const minutes = Math.floor(((totalDays - days) * 24 - hours) * 60);
    const seconds = Math.floor((((totalDays - days) * 24 - hours) * 60 - minutes) * 60);

    const handleMarkAsUnDoneInHere = () => {
        handleMarkAsUnDone(_id)
    }

    const handleDeleteInHere = () => {
        handleDelete(_id)
    }

    // console.log(seconds, minutes, hours, days)
    return (
        <div className='bg-white shadow-2xl rounded-xl h-auto w-10/12 p-5 flex flex-col gap-2 my-2'>

            <div className='flex items-center gap-4 w-auto justify-between '>
                <h1 className='text-black font-semibold text-lg'>{title}</h1>
                <CountdownTimer deadline={deadline} />
            </div>
            <p className='text-black text-sm'>{text}</p>
            <div className='p-3 flex  gap-2 justify-between mt-2'>
                {
                    completed ? <div className="tooltip tooltip-right" data-tip="Mark as UnDone">
                        <button className=' bg-red-400 rounded-full p-2'><RxCross2 className='text-base text-white' onClick={handleMarkAsUnDoneInHere} /></button>
                    </div> : <div className="tooltip tooltip-right" data-tip="Mark as Done">
                        <button className=' bg-green-400 rounded-full p-2'><MdDone className='text-base text-white' onClick={handleMarkAsUnDoneInHere} /></button>
                    </div>
                }
                <div className="tooltip tooltip-right" data-tip="Edit">
                    <button className=' bg-slate-400 rounded-full p-2'><MdEdit className='text-base text-white' /></button>
                </div>
                <div className="tooltip tooltip-right" data-tip="Set as High Priority">
                    <button className='  bg-emerald-400 rounded-full p-2'><BsGraphUpArrow className='text-base text-white' /></button>
                </div>
                <div className="tooltip tooltip-left" data-tip="Delete">
                    <button className=' bg-red-400 rounded-full p-2' onClick={handleDeleteInHere}><MdDelete className='text-base text-white' /></button>
                </div>

            </div>
        </div>
    )
}

export default TodoCard
