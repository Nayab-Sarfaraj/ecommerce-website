import React, { useEffect, useState } from "react";
import { fetchProduct } from "../Store/Slice/singleProduct";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Review from "./Review";
import { addToCart } from "../Store/Slice/cartSlice";
import { toast } from "react-toastify"

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    console.log(params.id);
    dispatch(fetchProduct(params.id));
  }, [params.id]);
  const product = useSelector((state) => state.singleProduct.data);
  const status = useSelector((state) => state.singleProduct.status);
  // accessing the error message if it exists
  const message = useDispatch((state) => state.singleProduct.data.message);
  console.log(product)
  if (status === "error") {
    alert(message);
    return;
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    if (quantity >= product.Stock) return;
    setQuantity(quantity + 1);
  };
  const handleAddToCart = async () => {

    await dispatch(addToCart({ id: product._id, quantity }))
    toast.success("Item added to cart")
  }
  return (
    <>
      <div className="md:w-full w-auto h-auto md:h-screen  bg-white flex  md:flex-row flex-col items-center justify-center md:p-10 p-0">
        {/* image section starts here */}
        <div className=" border-white border-4 md:w-1/2 md:h-full h-1/2 w-full flex items-center justify-center ">
          <img
            src={product.images && product.images[0].url}
            alt=""
            srcset=""
            className=" h-full m-2 md:m-0 p-5"
          />
        </div>
        {/* image section ends here */}
        {/* productr details section starts here */}
        <div className="md:w-1/2 md:h-full h-1/2 w-full border-white border-4 flex flex-col items-start py-3 px-5 justify-evenly md:gap-0 gap-3">
          <div>
            <h3 className="text-2xl font-semibold capitalize">
              {product.name}
            </h3>
            <p className="text-slate-500 break-words">
              Product : #{product._id}
            </p>
          </div>
          <div className="w-full">
            <hr className="bg-black text-black h-1 w-full opacity-30" />
            <div className=" flex items-center  gap-5 my-5 ">
              <ReactStars
                count={5}
                isHalf={true}
                value={product.ratings}
                size={24}
                activeColor={"#FF6347"}
              />
              <span className="opacity-45">
                ({product.numOfReviews} reviews)
              </span>
            </div>

            <hr className="bg-black text-black h-1 w-full opacity-30" />
          </div>
          <h3 className="text-2xl font-semibold ">{product.price} $</h3>
          <div className="flex items-center gap-10  w-full flex-wrap">
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
            <button className="px-5 py-1 bg-[#FF6347] rounded-full text-white" onClick={handleAddToCart}
            >
              {" "}
              Add to Cart
            </button>
          </div>
          <div className="w-full">
            <hr className="bg-black text-black h-1 w-full opacity-30" />
            <h3 className="text-lg font-semibold my-2">
              Stock :{" "}
              <span
                className={
                  product.Stock <= 0 ? "text-red-800" : "text-green-600"
                }
              >
                {product.Stock <= 0 ? "Out of Stock" : "In Stock"}
              </span>
            </h3>
            <hr className="bg-black text-black h-1 w-full opacity-30" />
          </div>
          <div>
            <h4 className="text-lg font-semibold">Description:</h4>
            <p>{product.description}</p>
          </div>
          <button className="px-5 py-1 bg-[#FF6347] rounded-full text-white">
            Submit Review
          </button>
        </div>

        {/* product details section ends here */}
      </div >
      <div className="flex items-center justify-center  flex-col">
        <h3 className="text-xl">Reviews</h3>

        <p className="w-52 h-[.15rem] bg-slate-800 "></p>
      </div>
      <div className="flex items-center justify-center  gap-3 m-5">
        {product.reviews && product.reviews[0] ? (
          product.reviews.map((review) => {
            return <Review key={review._id} review={review} />;
          })
        ) : (
          <div className="text-red-800 capitalize text-xl font-semibold">
            {" "}
            no reviews yet{" "}
          </div>
        )}
      </div>
    </>
  );
};
// https://www.instagram.com/reel/C06sEv7Rs-H/?utm_source=ig_web_copy_link

export default SingleProduct;
