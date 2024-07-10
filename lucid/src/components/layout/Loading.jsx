import React from 'react'
// import { TbLoader3 } from "react-icons/tb";
import { LuLoader } from "react-icons/lu";

import { BiLoaderCircle } from "react-icons/bi";

const Loading = () => {
  return (
    <div className=" flex items-center justify-center my-20">
      <BiLoaderCircle size={80} className='animate-spin text-[#256cdf]' />
      {/* <p className='text-4xl font-semibold'>Loading..... </p>
    <div className='w-14 h-14 bg-[#256cdf] rounded-full flex items-center animate-bounce justify-center'>
    <div className='bg-black h-1 w-full rounded-full animate-spin'></div>
    </div> */}
    </div>
  )
}

export default Loading