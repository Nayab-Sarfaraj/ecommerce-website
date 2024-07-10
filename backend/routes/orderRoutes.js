const router = require("express").Router();
const { Router } = require("express");
const orderControler = require("../controllers/orderController");
const { isAuthenticated } = require("../middleware/auth");
const { authenticateRole } = require("../middleware/auth");
router.route("/order/new").post(isAuthenticated, orderControler.placeOrder);
router.route("/order/:id").get(isAuthenticated,orderControler.getSingleOrder)
router
  .route("/orders/me")
  .get(isAuthenticated, authenticateRole("admin"), orderControler.myOrders);
router
  .route("/admin/order")
  .get(isAuthenticated,authenticateRole("admin"), orderControler.getAllOrders);
router
  .route("/admin/order/:id")
  .patch(isAuthenticated,authenticateRole("admin"), orderControler.updateOrderStatus)
  .delete(isAuthenticated,authenticateRole("admin"), orderControler.deleteOrder);

module.exports = router;
