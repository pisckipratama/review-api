const moment = require('moment');
const models = require("../models/index");
const Joi = require("joi");

class GenreController {
  static async addGenre(req, res) {
    const { name } = req.body;

    const schema = Joi.object().keys({
      name: Joi.string().required().max(25),
    });

    try {
      const payload = { name };
      const {_, error} =  schema.validate(payload);

      if (error)
        return res.status(400).json({
          message: "Field Name is required!",
          status: "bad request"
        });

      const data = await models.Genre.create({ name }, {
        raw: true,
        nested: true,
      });
      
      return res.status(201).json({
        data: {
          name: data.name,
          ID: data.id,
          CreatedAt: moment(data.createdAt).utc().utcOffset("+07:00").format(),
          UpdatedAt: moment(data.UpdatedAt).utc().utcOffset("+07:00").format(),
          DeletedAt: data.deletedAt === null ? null : moment(data.deletedAt).utc().utcOffset("+07:00").format(),
        },
        message: "Sucessfully add genre!",
        status: "success",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message, message: "an error occurred" });
    }
  }

  static async getGenre(req, res) {
    try {
      const data = await models.Genre.findAll({
        where: req.query,
        raw: true,
        nested: true,
        attributes: ['id', 'name'],
      });

      return res.status(200).json({
        data,
        message: "Successfully Get Genre List",
        status: "success"
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message, message: "an error occurred" });
    }
  }
}

module.exports = GenreController;
