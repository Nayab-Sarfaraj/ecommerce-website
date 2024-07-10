const userController = require("../controllers/userController");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/auth");
const { authenticateRole } = require("../middleware/auth");
router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/logout").get(userController.logOut);
router.route("/me").get(isAuthenticated, userController.getUserProfile);
router.route("/me/update").put(isAuthenticated, userController.updateProfile);
router
  .route("/password/update")
  .patch(isAuthenticated, userController.updatePassword);

router
  .route("/admin/users")
  .get(isAuthenticated, authenticateRole("admin"), userController.getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authenticateRole("admin"), userController.getUserInfo)
  .patch(
    isAuthenticated,
    authenticateRole("admin"),
    userController.udpateUserRole
  )
  .delete(
    isAuthenticated,
    authenticateRole("admin"),
    userController.deleteUser
  );

module.exports = router;
