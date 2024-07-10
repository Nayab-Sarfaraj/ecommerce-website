const express = require("express");
const { models } = require("mongoose");
// this contolls the product routes
const productRouter = require("./routes/productRoutes");
// this is our error handler function use it at the last of your routes as when ever error occur it goes there
const errorMiddleware = require("./middleware/error");
// this router controlls the user routes
const userRouter = require("./routes/userRoutes");
// this router controlls the order routes
const orderRouter = require("./routes/orderRoutes");
// cookie parser is necessary as want to saved and fetch the generated token inside the cookie
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use(errorMiddleware);
module.exports = app;
