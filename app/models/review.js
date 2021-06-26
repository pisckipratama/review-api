'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Movie, { foreignKey: 'movieId', as: 'movies' });
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    }
  };
  Review.init({
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};