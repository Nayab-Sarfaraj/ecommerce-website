import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import Loading from "./layout/Loading";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../Store/Slice/productSlice";
import Pagination from '@mui/material/Pagination';
import { Slider, Typography } from "@mui/material";


const Products = () => {
  const categories = ["Laptop", "Bottoms", "Tops", "Footwear", "Attire", "Camera", "SmartPhones"]
  const params = useParams();
  const dispatch = useDispatch();
  const keyword = params.keyword;
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 25000])
  const [category, setCategory] = useState("")
  const productPerPage = useSelector(state => state.products.data?.productPerPage)
  const productCount = useSelector(state => state.products.data?.productCount)
  // const filteredProductsCount = useSelector(state => state.products.data.filteredProductsCount)
  const [ratings, setRatings] = useState(0)
  useEffect(() => {
    dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
  }, [keyword, dispatch, currentPage, price, category, ratings])

  const setCurrentPageNo = (e, value) => {
    e.preventDefault()
    console.log(value)
    setCurrentPage(value)
  }
  const setCurrentRating = (e, value) => { setRatings(value) }
  const { products } = useSelector((state) => state.products.data);
  console.log(products);
  const { status } = useSelector((state) => state.products);
  const { message } = useSelector((state) => state.products.data);
  const handleError = () => {
    toast(message);
  };
  const handlePrice = (e, value) => { setPrice(value) }
  return (
    <div className=" flex items-center justify-center flex-col min-h-[50vh]">
      <div className="flex items-center justify-center  flex-col mt-20">
        <h3 className="text-xl opacity-50">Products</h3>

        <p className="w-52 h-[.15rem] bg-slate-800 opacity-50 "></p>
      </div>
      <div className="flex items-center justify-center flex-wrap  gap-10">
        {status === "success" ? (
          products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : status === "loading" ? (
          <Loading />
        ) : (
          handleError()
        )}


      </div>
      <div className="flex items-center w-full justify-evenly">
        <div> <div className="w-96 text-center">
          <Typography>Price</Typography>
          <Slider
            size="small"
            value={price}
            onChange={handlePrice}
            min={0}
            max={25000}
            aria-label="Small"
            aria-labelledby="reange-slider"
            valueLabelDisplay="on"
          />
        </div >
          <div className="w-60 text-center">
            <Typography>Ratings</Typography>
            <Slider
              size="small"
              value={ratings}
              onChange={setCurrentRating}
              min={0}
              max={5}
              aria-label="Small"
              aria-labelledby="reange-slider"
              valueLabelDisplay="on"
            />
          </div>
        </div>
        <div><div className="text-center">
          <Typography>Categories</Typography>
          <ul>
            {
              categories.map((category) => (
                <li key={category} onClick={() => setCategory(category)} className="hover:text-[#82B0FB] text-slate-600">
                  {category}
                </li>
              ))
            }
          </ul>
        </div></div>
      </div>



      {
        productPerPage <= productCount && (<div className="mb-10">
          <Pagination count={10} variant="outlined" shape="rounded" color="primary" onChange={setCurrentPageNo} page={currentPage} />


        </div>)
      }
    </div>
  );
};

export default Products;
