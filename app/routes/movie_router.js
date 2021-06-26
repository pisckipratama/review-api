const router = require("express").Router();
const MoviesController = require("../controllers/movies_controller");
const { protects, permission } = require("../middlewares/auth");

router.post(
  "/movies",
  protects,
  permission(["admin"]),
  MoviesController.addMovie
);

router.get("/movies", MoviesController.getMovies);
router.post("/movies/genre", MoviesController.addMovieGenre);

module.exports = router;
