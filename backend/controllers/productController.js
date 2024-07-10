const Products = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/users");
const ApiFeature = require("../utils/features");
// creating new products

const createNewProduct = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    const product = new Products(req.body);

    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      savedProduct,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 401));
  }
};

// get all product
const getAllProducts = async (req, res, next) => {
  try {
    // making the instance if a class and using the search method of the class
    const productPerPage = 6;
    // const productCount = await Products.find().count();
    const apiFeature = new ApiFeature(Products.find(), req.query)
      .search()
      .filter()
      .pagulation(productPerPage);
    const products = await apiFeature.query;
    if (!products) return next(new ErrorHandler("Products doesnt exist", 400));
    const productCount = products.length;
    return res.json({
      success: true,
      products,
      productPerPage,
      productCount,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 401));
  }
};

// updating product
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateProduct)
      return next(new ErrorHandler("Product doesnt exist", 400));
    return res.json(updatedProduct);
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
};

// deleting the product
const deleteProduct = async (req, res, next) => {
  try {
    // geting the product id by from the url
    const id = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(id);
    if (!deleteProduct)
      return next(new ErrorHandler("Product doesnt exist", 400));
    return res.json(deletedProduct);
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
};

// getting individual product
const getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id);
    console.log(product);
    if (!product) {
      return next(new ErrorHandler("Product doesnt exist", 400));
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};
// creating the product review
const createProductReviw = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const product = await Products.findById(productId);

    const { comment, rating } = req.body;
    const review = {
      // getting the user id and name from the req.user this will throw error a
      user: req.user._id,
      name: req.user.name,
      rating,
      comment,
    };

    const isExist = product.reviews.find(
      // here we are checking where the user has already given the review if it has given the review so we can replace the previous review
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isExist) {
      product.reviews.forEach((rev) => {
        // here if the user has already given the review then we ill rewrite the previous raing and  comment
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      // just pushing the review inside the reviews field
      product.reviews.push(review);
    }
    product.numOfReviews = product.reviews.length;
    let sum = 0;
    product.reviews.forEach((ele) => {
      sum += ele.rating;
    });
    product.ratings = sum / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    return res
      .status(201)
      .json({ success: true, message: "review added successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};
// getting ALL THE PRODUCT REVIEW
const getProductReviews = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const product = await Products.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product doesnt exist", 401));
    }

    return res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// deleting the review
const deleteReview = async (req, res, next) => {
  try {
    const productId = req.query.productId;

    const id = req.query.id;

    const product = await Products.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product doesnt exist", 401));
    }

    const updatedReviewfield = product.reviews.filter(
      (ele) => ele.user.toString() !== id.toString()
    );
    const numOfReviews = updatedReviewfield.length;

    let sum = 0;
    updatedReviewfield.forEach((ele) => (sum += ele.rating));

    const ratings = sum / updatedReviewfield.length;

    await Products.findByIdAndUpdate(
      productId,
      { reviews: updatedReviewfield, numOfReviews, ratings },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res
      .status(201)
      .json({ success: true, message: "Deleted review successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

module.exports = {
  createNewProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReviw,
  getProductReviews,
  deleteReview,
};
