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
        raw: true,
        include: {
          model: models.Genre,
          as: 'genres',
          attributes: []
        }
      });
      res.status(200).json({
        status: 200,
        success: true,
        content: data,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MoviesController;
