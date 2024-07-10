import React from 'react'
import profile from  '../images/Profile.png'
import ReactStars from "react-rating-stars-component";
const Review = ({review}) => {
  return (
    <div className="flex items-center justify-center flex-col bg-white border-2 border-slate-300 p-5 ">
          <img src={profile} alt="" srcset="" className="h-14"/>
          <h4 className="capitalize font-serif font-semibold">{review && review.name}</h4>
          <ReactStars
              count={5}
              isHalf={true}
              value={review.rating}
              size={24}
              activeColor={"#FF6347"}
            />
          <p>{review && review.comment}</p>
        </div>
  )
}

export default Review