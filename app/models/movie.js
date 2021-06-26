"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Genre, { through: models.MovieGenre, as: 'genres' });
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      year: DataTypes.INTEGER,
      ratings: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Movie",
    }
  );
  return Movie;
};
