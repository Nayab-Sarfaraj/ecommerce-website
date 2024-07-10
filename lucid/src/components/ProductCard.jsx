import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  console.log(product)
  return (
    <Link to={`/product/${product._id}`}>
      <div className="shadow-2xl my-10  hover:-translate-y-4  duration-500 ">
        <img src={product.images[0].url} alt={product.title} className="w-56 h-56" />
        <div className="px-3 py-5">
          <h3 className="text-lg">{product.name}</h3>
          <div className="flex items-center justify-between">
            <ReactStars count={5} isHalf={true} value={product.ratings} size={24} activeColor={"#FF6347"} />
            <p>({product.numOfReviews} reviews)</p>

          </div>
          <h3 className="text-lg text-[tomato]">{product.price} $</h3>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;
