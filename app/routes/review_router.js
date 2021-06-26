const router = require("express").Router();
const ReviewController = require("../controllers/review_controller");
const { protects, permission } = require("../middlewares/auth");

router.post(
  "/review",
  protects,
  permission(["user"]),
  ReviewController.addReview
);
router.get("/review", ReviewController.getReview);

module.exports = router;
