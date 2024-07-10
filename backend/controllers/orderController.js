const Order = require("../models/order");
const ErrorHandler = require("../utils/errorHandler");
const Products = require("../models/product");
const User = require("../models/users");
const placeOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      orderStatusmentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = await Order({
      shippingInfo,
      orderItems,
      paymentInfo,
      orderStatusmentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
      paidAt: Date.now(),
    });
    await order.save();

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// getsingle  order
// not tested
const getSingleOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (!order) return next(new ErrorHandler("order not found !", 404));

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};
// not tested
// get logged in userOrders
const myOrders = async (req, res, next) => {
  try {
    let totalPrice = 0;
    const orders = await Order.find({ user: req.user._id });
    if (!orders) return next(new ErrorHandler("order not found !", 404));
    return res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// get all orders admin
const getAllOrders = async (req, res, next) => {
  try {
    let totalPrice = 0;
    const orders = await Order.find();
    if (!orders) return next(new ErrorHandler("order not found !", 404));
    orders.forEach((order) => {
      totalPrice += order.totalPrice;
    });
    return res.status(201).json({
      success: true,
      orders,
      totalPrice: totalPrice,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// delete Order --Admin
const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orders = await Order.findByIdAndDelete(id);
    if (!orders) return next(new ErrorHandler("order not found !", 404));
    return res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

// update order status --Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) return next(new ErrorHandler("order not found !", 404));
    if (order.status === "Delivered")
      return next(new ErrorHandler("Order has already been delivered ", 401));
    order.orderItems.forEach((order) => {
      updateStock(order.product, order.quantity);
    });
    order.status = req.body.status;
    await order.save({ validateBeforeSave: false });
    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
};

const updateStock = async (id, quantity) => {
  const product = await Products.findById(id);
  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
};

module.exports = {
  placeOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,

  updateOrderStatus,
  deleteOrder,
};
