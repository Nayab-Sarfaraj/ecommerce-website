import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogoutUser } from '../../Store/Slice/userSlice';
const UserOptions = ({ user }) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState()
    const navigate = useNavigate()
    const orders = () => navigate("/orders")

    const account = () => navigate("/account")

    const dashboard = () => navigate("/dashboard")

    const logoutUser = async () => {
        const res = await dispatch(LogoutUser())
        console.log(res)
        toast.success("Logged out successfully")
        if (res.payload.success) navigate("/login")
    }
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }



    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"

                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                open={open}
                direction='down'

                style={{ zIndex: 11 }}
                icon={<img className='rounded-full' src={user.avatar.url ? user.avatar.url : "/Profile.png"} alt='Profile'></img>}
                className="fixed  right-[3vmax] top-[3vmax]"

            >
                {
                    options.map((option, index) => (
                        <SpeedDialAction key={index}
                            icon={option.icon}
                            onClick={option.func}
                            tooltipTitle={option.name}
                            tooltipOpen={window.innerWidth <= 600 ? true : false}

                        ></SpeedDialAction>
                    ))
                }
            </SpeedDial >
        </>
    )
}

export default UserOptions