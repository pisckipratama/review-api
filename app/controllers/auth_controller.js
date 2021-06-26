const Joi = require("joi");
const moment = require('moment');
const models = require("../models/index");
const { decrypt } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { decode } = require("jsonwebtoken");

class AuthController {
  static async registerUser(req, res) {
    const { email, password, fullname, role } = req.body;
    // const { filename, path } = req.file;

    const schema = Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(7).required().strict(),
      fullname: Joi.string().required(),
      role: Joi.string().required(),
    });

    try {
      let payload = { email, password, fullname, role };
      const { _, error } = schema.validate(payload);
      
      if (error) {
        return res.status(400).json({
          message: "Field Email, Password, FullName, Role is required!",
          status: "bad request"
        });
      }

      const checkUser = await models.User.findAll({
        where: { email },
      });

      if (checkUser.length > 0) {
        return res.status(400).json({
          message: "User is already exists, please use another email!",
          success: "bad request",
        });
      }

      const data = await models.User.create(payload, {
        returning: ['email', 'fullname', 'id', 'role'],
        raw: true,
        nested: true,
      });

      res.status(200).json({
        data: { email: data.email, fullname: data.fullname, id: data.id, role: data.role },
        message: "Sucessfully Register!",
        status: 'success',
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message, status: 'an error occured' });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    const schema = Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(7).required().strict(),
    });

    try {
      const { _, error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: "Field Email, Password is required!",
          status: "bad request"
        });
      }

      const data = await models.User.findOne({
        where: { email },
        raw: true,
        nested: true,
      });

      if (!data)
        return res.status(401).json({
          code: 401,
          message: "incorrect Username or Password",
        });

      const payload = {
        id: data.id,
        email: data.email,
        photo: data.fullname,
        role: data.role,
      };

      const token = generateToken(payload);
      let verify = decrypt(password, data.password);

      if (!verify)
        return res.status(401).json({
          code: 401,
          message: "incorrect Username or Password",
        });
      
      return res.status(200).json({
        code: 200,
        expire: moment(new Date(decode(token).exp * 1000)).utc().utcOffset("+07:00").format(),
        token,
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

module.exports = AuthController;
