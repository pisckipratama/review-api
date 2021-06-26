const router = require("express").Router();
const ReviewController = require("../controllers/review_controller");
const { protects, permission } = require("../middlewares/auth");

router.post("/review", protects, permission(['user']), ReviewController.addReview);

module.exports = router;
