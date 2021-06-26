const router = require("express").Router();
const RoomsController = require("../controllers/rooms_controller");
const BookingsController = require("../controllers/bookings_controller");
const { protects, isAdmin } = require("../middlewares/auth");
const multer = require("../helpers/multer");

router.get("/", RoomsController.getAllRooms);
router.get("/:id", RoomsController.getOneRoom);
router.post(
  "/",
  protects,
  isAdmin(true),
  multer.createMulterRooms([".jpg", ".jpeg", ".png"]).single("photo"),
  RoomsController.postRoom
);

// booking routes
router.post("/:roomId/booking", protects, isAdmin(false), BookingsController.postBookingByRoomId);
module.exports = router;
