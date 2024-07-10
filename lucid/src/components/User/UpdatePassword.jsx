import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { STATUSES, updatePassword } from '../../Store/Slice/userSlice';
import Loading from '../layout/Loading';
const UpdatePassword = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const status = useSelector(state => state.user.status)
    const navigate = useNavigate()
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const errorMessage = useSelector(state => state.user.errorMessage)
    const dispatch = useDispatch()
    const registerSubmit = async (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)

        myForm.set("confirmPassword", confirmPassword)
        myForm.forEach((data) => console.log(data))
        const res = await dispatch(updatePassword(myForm))
        if (res.payload?.success) navigate("/account")
    }


    useEffect(() => {

        if (errorMessage !== "") toast.error(errorMessage)

    }, [errorMessage])
    return (
        <>
            <div className='h-screen w-full flex items-center justify-center'>
                {status === STATUSES.LOADING ? <Loading /> : <div className=' bg-white h-[28rem] w-full  mx-10 flex items-center justify-center'>
                    <form className=" flex items-center justify-evenly h-full flex-col w-[30%] px-7 py-5" onSubmit={registerSubmit}>
                        <h1 className='text-xl font-semibold text-black '>Update profile</h1>
                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 active:shadow-2xl">
                            <VpnKeyIcon className='mx-2' />
                            <input
                                type="password"
                                placeholder="Old Password"
                                required
                                className='outline-none border-none w-[85%]'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 active:shadow-2xl">
                            <LockOpenIcon className='mx-2' />
                            <input
                                type="password"
                                placeholder="New Password"
                                required
                                className='outline-none border-none w-[85%]'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 active:shadow-2xl">
                            <LockIcon className='mx-2' />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                className='outline-none border-none w-[85%]'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <input type="submit" value="Update" className="bg-[#256cdf] text-white hover:text-black transition-all w-full text-lg py-2 duration-200" />
                    </form>

                </div>}



            </div>
        </>
    )
}

export default UpdatePassword