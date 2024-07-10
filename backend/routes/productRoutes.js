const Producs = require("../models/product");
const productController = require("../controllers/productController");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const { authenticateRole } = require("../middleware/auth");
// creating new product

router.route("/product/new").post(
  // checking whethe the user is logged in or registered by using verifying the jwt token
  isAuthenticated,
  // checking the user wanting to access the route is admin or not if it is not admin the the permission will be granted and a custom errpr will be sent to the user
  authenticateRole("admin"),
  productController.createNewProduct
);

router.route("/product").get(productController.getAllProducts);

router.route("/product/:id").get(productController.getSingleProduct);

router
  .route("/product/:id")
  .patch(
    isAuthenticated,
    authenticateRole("admin"),
    productController.updateProduct
  )
  .delete(
    isAuthenticated,
    authenticateRole("admin"),
    productController.deleteProduct
  );
router
  .route("/review")
  .put(isAuthenticated, productController.createProductReviw);
router
  .route("/reviews")
  .get(productController.getProductReviews)
  .delete(isAuthenticated, productController.deleteReview);
module.exports = router;
