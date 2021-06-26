const router = require("express").Router();
const BookingsController = require("../controllers/bookings_controller");
const { protects, isAdmin } = require("../middlewares/auth");

router.get("/", protects, BookingsController.getAllBooking);
router.get("/:id", protects, BookingsController.getBooking);
router.post("/:id/check-in", protects, BookingsController.postCheckIn);

module.exports = router;
