import React, { useEffect, useState } from "react";
import { PiMouseSimpleDuotone } from "react-icons/pi";
import Product from "./ProductCard";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./layout/Loading";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { fetchProducts } from "../Store/Slice/productSlice";


const Home = () => {

  const Clip = {
    clipPath: "polygon(0 0, 100% 0, 100% 71%, 0 100%)",
  };
  const productContainer = useSelector((state) => state.products.data?.products);
  let { status } = useSelector((state) => state.products);
  const errorMessage = useSelector(state => state.user.errorMessage)

  const productCount = useSelector(state => state.products.data.productCount)
  const productPerPage = useSelector(state => state.products.data.productPerPage)
  const dispatch = useDispatch();
  const currentPage = 1
  const keyword = ""
  useEffect(() => {

    (productCount < productPerPage) && (

      dispatch(fetchProducts({ keyword, currentPage })))
  }, [productCount, productPerPage, dispatch]);
  const handleClick = () => {
    toast("I have been clicked")
  }
  const handleError = () => {
    toast(errorMessage
      || "something went wrong")
  }
  return (
    <>
      {/* this is to change the name of the page as we shift from one page to another */}
      <MetaData title="Lucid" />
      <div
        className="h-screen flex items-center justify-center text-white bg-[#256cdf]"
        style={Clip}
      >
        <div className=" text-center flex flex-col items-center justify-center gap-20">
          <h3 className="text-2xl font-semibold">Welcome To Lucid</h3>
          <h1 className="uppercase text-3xl">Find amazing products below</h1>
          <div className="flex items-center justify-center ">
            <button className=" flex items-center justify-center bg-black px-2 py-1 text-xl rounded-md" onClick={() => { handleClick() }}>
              Scroll <PiMouseSimpleDuotone />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center  flex-col">
        <h3 className="text-xl">Featured Products</h3>

        <p className="w-52 h-[.15rem] bg-slate-800 "></p>
      </div>
      {/* <div className=" flex items-center  w-full flex-wrap gap-8 justify-center"> */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 lg:mx-20 md:mx-14 mx-5 ">
        {status === "success" ? (
          productContainer &&
          productContainer.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : status === "loading" ? (
          <Loading />
        ) : (
          handleError()

        )}
      </div>
    </>
  );
};

export default Home;
