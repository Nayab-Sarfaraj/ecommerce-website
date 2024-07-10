import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
import { LogInUser, RegisterUser } from '../../Store/Slice/userSlice';
import { toast } from 'react-toastify';
const LoginSignUp = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        password: "",
        email: ""
    })
    const { email, password, name } = user
    const [avatar, setAvatar] = useState("/Profile.png")
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const errorMessage = useSelector(state => state.user.errorMessage)
    const dispatch = useDispatch()
    const registerSubmit = async (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)
        const res = await dispatch(RegisterUser(myForm))
        if (res.payload.success) navigate("/")
    }
    const registerDataChange = (e) => {
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

        } else {

            setUser({ ...user, [e.target.name]: e.target.value })
        }


    }
    useEffect(() => {
        if (errorMessage !== "")
            toast.error(errorMessage)
    }, [errorMessage])
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(loginEmail, loginPassword)
        const res = await dispatch(LogInUser({ loginEmail, loginPassword }))
        if (res.payload.success) navigate("/")
    }
    return (
        <div className='flex items-center justify-center h-[67.7vh] bg-[ rgb(220, 220, 220)]'>
            {pathname.includes("login") ?

                <div className='border-2 p-5 rounded-md bg-white h-80 border-slate-600 mx-10'>
                    <form className=" flex items-center justify-evenly h-full flex-col" >
                        <h1 className='text-xl font-semibold text-black '>Login</h1>
                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 ">
                            <MailOutlinedIcon className='mx-2' />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                className='outline-none border-none'
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 active:shadow-2xl">
                            <LockOpenIcon className='mx-2' />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className='outline-none border-none'
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot" className='self-end'>Forget Password ?</Link>
                        <input type="submit" value="Login" className="bg-[#256cdf] text-white hover:text-black transition-all w-full text-lg py-2" onClick={handleLogin} />
                    </form>

                </div>

                : <div className='border-2 rounded-md bg-white h-[28rem] px-7 py-5 border-slate-600 mx-10'>
                    <form className=" flex items-center justify-evenly h-full flex-col" onSubmit={registerSubmit}>
                        <h1 className='text-xl font-semibold text-black '>Sign up</h1>
                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 ">
                            <FaceIcon className='mx-2' />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                className='outline-none border-none md:w-[85%] w-[60%]'
                                onChange={registerDataChange}
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
                                onChange={registerDataChange}
                                className='outline-none border-none md:w-[85%] w-[60%]'
                            />
                        </div>
                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 active:shadow-2xl">
                            <LockOpenIcon className='mx-2' />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name='password'
                                onChange={registerDataChange}
                                value={password}
                                className='outline-none border-none md:w-[85%] w-[60%]'
                            />
                        </div>
                        <div className=" bg-[ rgb(231, 231, 231)] border-2 border-slate-600  w-full py-2 flex">
                            <img src={avatarPreview} alt="Avatar Preview" className='h-7 mx-2' />
                            <input
                                type="file"
                                placeholder="Avatar"
                                required
                                name="avatar"
                                accept='image/*'
                                onChange={registerDataChange}
                                className='outline-none border-none w-full'
                            />
                        </div>

                        <input type="submit" value="Register" className="bg-[#256cdf] text-white hover:text-black transition-all w-full text-lg py-2" />
                    </form>

                </div>}
        </div>
    )
}

export default LoginSignUp