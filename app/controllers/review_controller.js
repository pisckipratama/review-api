const moment = require('moment');
const models = require("../models/index");
const Joi = require("joi");

class MoviesController {
  static async addReview(req, res) {
    const { user_id, movie_id, review, rate } = req.body;

    const schema = Joi.object().keys({
      user_id: Joi.string().required(),
      movie_id: Joi.string().required(),
      review: Joi.string().required().max(60),
      rate: Joi.string().required(),
    });

    try {
      let payload = { user_id, movie_id, review, rate };
      const {_, error} = schema.validate(payload);

      if (error)
        return res.status(400).json({
          message: "Field User_ID, Movie_ID, Review, Rate is required!",
          status: "bad request"
        });

      const user = await models.User.findByPk(parseInt(user_id));
      const movie = await models.Movie.findByPk(parseInt(movie_id));

      if (!user || !movie)
        return res.status(400).json({
          message: 'userID or movieID is not found!',
          status: 'bad request'
        });
      
      const data = await models.Review.create({
        UserId: user_id,
        MovieId: movie_id,
        review,
        rate
      }, {
        returning: true,
        plain: true,
      });

      return res.status(200).json({
        data: {
          id: data.id,
          review: data.review,
          rate: data.rate,
          user_id: data.UserId,
          movie_id: data.MovieId,
          CreatedAt: moment(data.createdAt).utc().utcOffset("+07:00").format(),
          UpdatedAt: moment(data.updatedAt).utc().utcOffset("+07:00").format(),
          DeletedAt: data.deletedAt === null ? null : moment(data.deletedAt).utc().utcOffset("+07:00").format(),
        },
        message: "Sucessfully Add Reviews For this Movie!",
        status: "success",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getMovies(req, res) {
    const query = req.query;
    try {
      const data = await models.Movie.findAll({
        where: query,
        include: [{
          model: models.Genre,
          as: 'genres',
          required: false,
          through: { attributes: [] },
        }]
      });
      
      const response = data.map(item => {
        const genres = item.genres.map(el => {
          const result = {
            name: el.name,
            ID: el.id,
            CreatedAt: moment(el.createdAt).utc().utcOffset("+07:00").format(),
            UpdatedAt: moment(el.updatedAt).utc().utcOffset("+07:00").format(),
            DeletedAt: el.deletedAt === null ? null : moment(el.deletedAt).utc().utcOffset("+07:00").format(),
          };
          return result;
        });

        const result = {
          title: item.title,
          year: item.year,
          ratings: item.ratings,
          genres,
          ID: item.id,
          CreatedAt: moment(item.createdAt).utc().utcOffset("+07:00").format(),
          UpdatedAt: moment(item.updatedAt).utc().utcOffset("+07:00").format(),
          DeletedAt: item.deletedAt === null ? null : moment(item.deletedAt).utc().utcOffset("+07:00").format(),
        }
        return result;
      });

      return res.status(200).json({
        data: response,
        message: "Sucessfully Get Data!",
        status: "success"
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message, message: 'an error occurred' });
    }
  }

  static async addMovieGenre(req, res) {
    const { moviesID, genreID } = req.body;
    const schema = Joi.object().keys({
      moviesID: Joi.string().required(),
      genreID: Joi.string().required(),
    });

    try {
      let payload = { moviesID, genreID };
      const {_, error} = schema.validate(payload);

      if (error)
        return res.status(400).json({
          message: "Field moviesID, genreID is required!",
          status: "bad request"
        });
      
      const movie = await models.Movie.findByPk(parseInt(moviesID));
      const genre = await models.Genre.findByPk(parseInt(genreID));

      if (!movie || !genre)
      return res.status(400).json({
        message: "movieID or genreID is not found!",
        status: "bad request"
      });

      const data = await models.MovieGenre.create({
        movieId: moviesID,
        genreId: genreID
      }, {
        returning: true,
        plain: true,
      });

      const response = {
        movie_id: data.movieId,
        movie: movie.title,
        genre_id: data.genreId,
        genre: genre.name,
        ID: data.id,
        CreatedAt: moment(data.createdAt).utc().utcOffset("+07:00").format(),
        UpdatedAt: moment(data.updatedAt).utc().utcOffset("+07:00").format(),
        DeletedAt: data.deletedAt === null ? null : moment(data.deletedAt).utc().utcOffset("+07:00").format(),
      }
      
      return res.status(200).json({
        data: response,
        message: "Sucessfully Added Data!",
        status: "success"
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message, message: 'an error occurred' });
    }
  }
}

module.exports = MoviesController;
