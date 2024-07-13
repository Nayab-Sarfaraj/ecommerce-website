import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import { useNavigate } from "react-router-dom"
const Cart = () => {
    const cartItems = useSelector(state => state.cart.cart.cartItems)
    const navigate = useNavigate()


    return (
        <div className='w-full min-h-screen'>
            {cartItems?.length === 0 ? <div>No cart </div> : <div className='flex items-center flex-col w-full h-full md:px-20  px-5 mt-5'>
                <div className='bg-[#256cdf] w-full flex   items-center justify-between px-4 md:gap-0 gap-5 py-2'>
                    <h3 className='w-[60%] text-lg font-semibold'>Product</h3>
                    <h3 className='text-lg font-semibold'>Quantity</h3>
                    <h3 className='text-lg font-semibold'>Subtotal</h3>
                </div>
                < >
                    {
                        cartItems?.map((item) => (<CartItem item={item} />))
                    }
                </>
                <div className='self-end md:w-[30%] w-full '>
                    <div className=' w-full h-1 bg-[#256cdf] border-[.5px] border-[#256cdf]'></div>
                    <div className='flex flex-row items-center justify-between mt-5'>
                        <div className='text-lg font-semibold'>Cross total</div>
                        <div className='text-lg font-semibold '>${cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}</div>

                    </div>
                    <button className='bg-[#256cdf] w-full mt-5 py-2 text-white hover:text-black transition-all duration-500 rounded-sm' onClick={() => {navigate("/login?redirect=ship") }}>Check out</button>
                </div>
            </div>}

        </div>
    )
}

export default Cart