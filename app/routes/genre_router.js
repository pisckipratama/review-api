const router = require("express").Router();
const GenreController = require("../controllers/genre_controller");
const { protects, permission } = require("../middlewares/auth");

router.post(
  "/genre",
  protects,
  permission(["admin"]),
  GenreController.addGenre
);
router.get("/genre", GenreController.getGenre);

module.exports = router;
