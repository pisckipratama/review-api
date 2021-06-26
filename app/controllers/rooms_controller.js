const models = require("../models/index");
const Joi = require("joi");
const upload = require("../helpers/upload_photo");

class RoomsController {
  static async postRoom(req, res, next) {
    const { room_name, room_capacity } = req.body;
    const { filename, path } = req.file;

    const schema = Joi.object().keys({
      room_name: Joi.string().required().max(32),
      room_capacity: Joi.string().required(),
      photo: Joi.string(),
    });

    try {
      let payload = { room_name, room_capacity, photo: filename };
      await schema.validateAsync(payload);

      const url = await upload.uploadPhoto(path);
      payload.photo = url;
      const data = await models.Room.create(payload);

      res.status(201).json({
        status: 201,
        success: true,
        message: "Room was created successfully!",
        content: data,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllRooms(req, res, next) {
    const query = req.query;
    try {
      const data = await models.Room.findAll(query);
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

  static async getOneRoom(req, res, next) {
    const { id } = req.params;
    try {
      const data = await models.Room.findAll({ where: { id } });
      if (data.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "data not found",
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        content: data[0],
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = RoomsController;
