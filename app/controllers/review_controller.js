const moment = require("moment");
const models = require("../models/index");
const Joi = require("joi");

class ReviewController {
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
      const { _, error } = schema.validate(payload);

      if (error)
        return res.status(400).json({
          message: "Field User_ID, Movie_ID, Review, Rate is required!",
          status: "bad request",
        });

      const user = await models.User.findByPk(parseInt(user_id));
      const movie = await models.Movie.findByPk(parseInt(movie_id));

      if (!user || !movie)
        return res.status(400).json({
          message: "userID or movieID is not found!",
          status: "bad request",
        });

      const data = await models.Review.create(
        {
          UserId: user_id,
          MovieId: movie_id,
          review,
          rate,
        },
        {
          returning: true,
          plain: true,
        }
      );

      return res.status(200).json({
        data: {
          id: data.id,
          review: data.review,
          rate: data.rate,
          user_id: data.UserId,
          movie_id: data.MovieId,
          CreatedAt: moment(data.createdAt).utc().utcOffset("+07:00").format(),
          UpdatedAt: moment(data.updatedAt).utc().utcOffset("+07:00").format(),
          DeletedAt:
            data.deletedAt === null
              ? null
              : moment(data.deletedAt).utc().utcOffset("+07:00").format(),
        },
        message: "Sucessfully Add Reviews For this Movie!",
        status: "success",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getReview(req, res) {
    const { movieID } = req.query;
    const schema = Joi.object().keys({
      movieID: Joi.string().required(),
    });

    try {
      let payload = { movieID };
      const { _, error } = schema.validate(payload);

      if (error)
        return res.status(400).json({
          message: "Parameter movieID is required!",
          status: "bad request",
        });

      const data = await models.Review.findAll({
        where: { MovieId: parseInt(movieID) },
        include: [
          {
            model: models.User,
            as: "users",
            required: false,
            attributes: ["email", "fullname", "role"],
          },
          {
            model: models.Movie,
            as: "movies",
            required: false,
            attributes: ["title", "year", "ratings"],
          },
        ],
      });

      const response = data.map((item) => {
        const result = {
          id: item.id,
          review: item.review,
          user_id: item.UserId,
          users: item.users,
          movies_id: item.MovieId,
          movies: item.movies,
          CreatedAt: moment(item.createdAt).utc().utcOffset("+07:00").format(),
          UpdatedAt: moment(item.updatedAt).utc().utcOffset("+07:00").format(),
          DeletedAt:
            item.deletedAt === null
              ? null
              : moment(item.deletedAt).utc().utcOffset("+07:00").format(),
        };
        return result;
      });

      return res.status(200).json({
        data: response,
        message: "Sucessfully Get Data!",
        status: "success",
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ error: error.message, message: "an error occurred" });
    }
  }
}

module.exports = ReviewController;
