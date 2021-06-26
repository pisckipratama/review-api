const model = require('../models/index');
const Joi = require("joi");
const sendEmail = require('../helpers/send_email');
const moment = require('moment');

class BookingsController {
  static async postBookingByRoomId(req, res, next) {
    const { roomId } = req.params;
    const { id } = req.user;
    const { 
      total_person,
      booking_time,
      noted,
    } = req.body;

    const schema = Joi.object().keys({
      UserId: Joi.number().required(),
      RoomId: Joi.number().required(),
      total_person: Joi.number().required(),
      booking_time: Joi.date().required(),
      noted: Joi.any()
    });

    try {
      const payload = { 
        total_person, 
        booking_time, 
        noted,
        UserId: id, 
        RoomId: roomId, 
      };
      await schema.validateAsync(payload);

      const dataRoom = await model.Room.findAll({ where: { id: roomId } });
      if (dataRoom.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "data not found!",
        });
      }

      if (parseInt(total_person) > parseInt(dataRoom[0].dataValues.room_capacity)) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "this room cannot overcapacity!"
        });
      }

      const data = await model.Booking.create(payload);
      res.status(201).json({
        status: 201,
        success: true,
        message: "booking created successfully",
        content: data
      });

      const message = `
      Please don't reply this email. Here is your booking detail,\n
      Room Name \t: ${dataRoom[0].dataValues.room_name}
      Total Person \t: ${total_person}
      Booking Time \t: ${moment(booking_time).format('LL')}
      Notes \t\t: ${noted}\n\n
      if you are not booked, please contact us at support@tamtel.com

      Best Regards,
      TamTel Support.
      `

      await sendEmail({
        email: req.user.email,
        subject: `Thanks for booking ${dataRoom[0].dataValues.room_name}`,
        message
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async postCheckIn(req, res, next) {
    const { id } = req.params;
    const { id: user_id } = req.user;

    try {
      const dataRoom = await model.Booking.findAll({ where: { id } });
      if (dataRoom.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "data not found!"
        });
      }

      if (dataRoom[0].dataValues.UserId !== user_id) {
        return res.status(403).json({
          status: 403,
          success: false,
          message: "user forbidden for accessing this route!"
        });
      }

      if (dataRoom[0].check_in_time !== null) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Room already checked in!"
        })
      }

      if (
        moment(dataRoom[0].dataValues.booking_time).format('YYYY-MM-DD') !== 
        moment(Date.now()).format('YYYY-MM-DD')
      ) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Can not check in, maybe is not the time or expired!"
        })
      }

      await model.Booking.update({ check_in_time: Date.now() }, {
        where: { id, UserId: user_id }
      });

      res.status(201).json({
        status: 201,
        success: true,
        message: "Checked In successfully!"
      });

      const message = `
      Please don't reply this email.
      You have been checked in your booked room.
      Enjoy!

      if you are not booked, please contact us at support@tamtel.com

      Best Regards,
      TamTel Support.
      `;
      console.log(req.user.email);
      await sendEmail({
        email: req.user.email,
        subject: `Check In Successfully`,
        message
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllBooking(req, res, next) {
    try {
      const dataBooking = await model.Booking.findAll({
        where: { UserId: req.user.id },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt', 'UserId', 'RoomId']
        },
        include: [
          { model: model.User, attributes: ['email'] },
          { model: model.Room, attributes: ['room_name', 'room_capacity'] }
        ]
      });

      return res.status(200).json({
        status: 200,
        success: true,
        content: dataBooking
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getBooking(req, res, next) {
    const { id } = req.params;

    try {
      const dataBooking = await model.Booking.findAll({
        where: { id },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt', 'UserId', 'RoomId']
        },
        include: [
          { model: model.User, attributes: ['email'] },
          { model: model.Room, attributes: ['room_name', 'room_capacity'] }
        ]
      });

      if (dataBooking.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "data not found!"
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        content: dataBooking[0]
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookingsController;