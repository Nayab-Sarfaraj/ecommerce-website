import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../Store/Slice/cartSlice';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(item.quantity)
    const decreaseQuantity = async () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1
            setQuantity(newQuantity);
            await dispatch(addToCart({ id: item._id, quantity: newQuantity }))
        }
    };
    const increaseQuantity = async () => {
        if (quantity >= item.Stock) return;
        console.log(quantity)
        const newQuantity = quantity + 1
        setQuantity(newQuantity);
        console.log(quantity)
        await dispatch(addToCart({ id: item._id, quantity: newQuantity }))


    };
    const handleRemoveItem =async () => {
        await dispatch(removeFromCart(item._id))
        toast.success("item removed ")
    }
    return (
        <div className='w-full flex items-center justify-between md:p-5 py-2 px-1'>
            <div className='flex items-center h-full gap-x-3 w-[60%]'>
                <div><img src={item?.images[0].url} alt="" className='h-40' /></div>
                <div className='self-start'>
                    <p className='text-md font-normal capitalize'>{item?.name}</p>
                    <p className='text-md font-normal  caption-top'>Price: {item?.price}</p>
                    <button className='text-[tomato]' onClick={handleRemoveItem}>Remove</button>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-black text-white px-2 py-1 text-base"
                    onClick={decreaseQuantity}
                >
                    -
                </button>
                <p className="bg-white px-3 py-1" >{quantity}</p>
                <button
                    className="bg-black text-white px-2 py-1"
                    onClick={increaseQuantity}
                >
                    +
                </button>
            </div>
            <div>{item.price * item.quantity}</div>
        </div>
    )
}

export default CartItem