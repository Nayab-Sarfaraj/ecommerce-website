import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import LoginSignUp from '../User/LoginSignUp'

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    const handleNavigate = () => navigate("/login")
    return (
        <>
            {isAuthenticated ? <Outlet /> : handleNavigate()}
        </>
    )
}

export default ProtectedRoute