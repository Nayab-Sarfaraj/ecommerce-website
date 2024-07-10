
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
import { LogInUser, RegisterUser, STATUSES, UpdateProfile } from '../../Store/Slice/userSlice';
import Loading from '../layout/Loading';
import { toast } from 'react-toastify';
const EditProfile = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    // const 
    const user = useSelector(state => state.user.data.user)
    const status = useSelector(state => state.user.status)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const errorMessage = useSelector(state => state.user.errorMessage)
    const dispatch = useDispatch()
    const registerSubmit = async (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)

        myForm.set("avatar", avatar)
        myForm.forEach((data) => console.log(data))
        const res = await dispatch(UpdateProfile(myForm))
        if (res.payload.success) navigate("/account")
    }
    const updateDataChange = (e) => {
        e.preventDefault()
        if (e.target.name === "avatar") {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);

        }


    }
    useEffect(() => {
        if (user) {
            setEmail(user.email)
            setName(user.name)
            setAvatarPreview(user.avatar.url)
        }

    }, [user])
    useEffect(() => { if (errorMessage !== "") toast.error(errorMessage) }, [errorMessage])
    return (
        <>
            <div className='flex items-center justify-center h-screen w-full'>

                {status === STATUSES.LOADING ? <Loading /> : <div className='border-2 rounded-md bg-white h-[28rem] px-7 py-5 border-slate-600 mx-10'>
                    <form className=" flex items-center justify-evenly h-full flex-col" onSubmit={registerSubmit}>
                        <h1 className='text-xl font-semibold text-black '>Update profile</h1>
                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 ">
                            <FaceIcon className='mx-2' />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                className='outline-none border-none md:w-[85%] w-[60%]'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 ">
                            <MailOutlinedIcon className='mx-2' />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='outline-none border-none md:w-[85%] w-[60%]'
                            />
                        </div>

                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 flex">
                            <img src={avatarPreview} alt="Avatar Preview" className='h-7 mx-2' />
                            <input
                                type="file"
                                placeholder="Avatar"
                                name="avatar"
                                accept='image/*'
                                onChange={updateDataChange}
                                className='outline-none border-none w-full'
                            />
                        </div>

                        <input type="submit" value="Update" className="bg-[#256cdf] text-white hover:text-black transition-all w-full text-lg py-2 duration-200" />
                    </form>

                </div>}
            </div></>
    )
}

export default EditProfile