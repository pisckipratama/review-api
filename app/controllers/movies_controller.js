const moment = require('moment');
const models = require("../models/index");
const Joi = require("joi");

class MoviesController {
  static async addMovie(req, res) {
    const { title, year, ratings } = req.body;

    const schema = Joi.object().keys({
      title: Joi.string().required().max(25),
      year: Joi.string().required().max(4),
      ratings: Joi.string(),
    });

    try {
      let payload = { title, year, ratings: "0" };
      const {_, error} = schema.validate(payload);

      if (error)
        return res.status(400).json({
          message: "Field Title, Year, Ratings is required!",
          status: "bad request"
        });

      const data = await models.Movie.create(payload);

      return res.status(201).json({
        data: {
          id: data.id,
          ratings: parseInt(ratings),
          title: data.title,
          year: data.year,
        },
        message: "Sucessfully Created Data!",
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

      const data = await models.MovieGenre.create({
        movieId: moviesID,
        genreId: genreID
      }, {
        returning: true,
        plain: true,
      });

      const response = {
        movie_id: data.movieId,
        movie: movie.name,
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
