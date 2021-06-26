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
          through: {
            model: models.MovieGenre,
            as: 'movieGenres',
            attributes: [],
          }
        }]
      });
      
      const response = data.map(item => {
        const genres = item.genres.map(el => {
          console.log(el.ID);
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
      })

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
}

module.exports = MoviesController;
