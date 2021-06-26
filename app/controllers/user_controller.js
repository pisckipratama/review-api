const Joi = require("joi");
const models = require("../models/index");

class UserController {
  static async getUsers(req, res) {
    const { email } = req.query;
    const schema = Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
    });

    try {
      const payload = { email };
      const { _, error } = schema.validate(payload);

      if (error) {
        return res.status(400).json({
          message: "Parameter Email is required!",
          status: "bad request"
        });
      }

      const data = await models.User.findOne({ 
        where: { email },
        raw: true,
        nested: true, 
      });

      if (!data)
        return res.status(400).json({
          errors: "record not found",
          message: "User not found!",
          status: "not found"
        });

      return res.status(200).json({
        data: {
          id: data.id,
          email: data.email,
          fullname: data.fullname,
          role: data.role,
        },
        message: 'Sucessfully Get Data!',
        status: 'success',
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    const { fullname } = req.body;
    const { email } = req.query;
    const { email: emailSession, role } = req.user;

    const schema = Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      fullname: Joi.string().required(),
    });

    try {
      const { _, error } = schema.validate({ email, fullname });
      if (error) {
        return res.status(400).json({
          message: "Parameter Email and Field Fullname is required!",
          status: "bad request"
        });
      }

      const data = await models.User.findOne({
        where: { email },
        raw: true,
        nested: true,
      });

      if (!data)
        return res.status(400).json({
          errors: "record not found",
          message: "User not found!",
          status: "not found"
        });
      
      if (role !== 'admin' && email !== emailSession) {
        return res.status(401).json({
          code: 401,
          message: "not allowed to access"
        });
      }

      const [value, result] = await models.User.update({ fullname }, {
        where: { email },
        raw: true,
        nested: true,
        returning: ['id', 'email', 'fullname', 'role']
      });

      return res.status(200).json({
        data: result[0],
        message: "Sucessfully Updated Data!",
        status: "success"
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        status: 'an error occured',
        message: error.message,
      });
    }
  }
}

module.exports = UserController;
