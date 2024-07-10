import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
const Profile = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const user = useSelector(state => state.user.data.user)
    console.log(user)
    const navigate = useNavigate()

    return (
        <div className='h-screen px-10 md:px-10 flex items-center justify-center'>
            <div className='flex items-center justify-evenly w-full h-full md:flex-row flex-col '>
                <div className='md:w-[40%] w-full flex items-center justify-between flex-col gap-7'>
                    <h1 className='text-2xl font-semibold text-slate-400 self-start md:mt-0 mt-10'>My Profile</h1>
                    <img src={user?.avatar?.url} alt="" className='h-72 w-72 rounded-full' />
                    <button className='bg-[#256cdf]  text-white hover:text-black transition-all  duration-200 w-[50%]  p-2' onClick={() => navigate("/me/update")}>Edit Profile</button>
                </div>
                <div className='md:w-[30%] w-full flex items-start justify-between flex-col gap-10 mt-3' >
                    <div>
                        <h1 className='text-lg font-semibold'>Full Name</h1>
                        <h1 className='text-slate-400 font-semibold capitalize text-lg
                        '>{user?.name}</h1>
                    </div>
                    <div>
                        <h1 className='text-lg font-semibold'>Email</h1>
                        <h1 className='text-slate-400 font-semibold  text-lg
                        '>{user?.email}</h1>
                    </div>
                    <button className='bg-stone-600 w-full text-white hover:text-black transition-all  duration-200 p-2 ' >My Orders</button>
                    <button className='bg-stone-600 w-full text-white hover:text-black transition-all  duration-200 p-2' onClick={() => navigate("/password/update")}>Change Password</button>
                </div>
            </div>
        </div>
    )
}

export default Profile