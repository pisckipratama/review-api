"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Movie, { 
        through: "MovieGenres", 
        as: 'movies',
        foreignKey: 'genreId',
        otherKey: 'moviesId',
      });
    }
  }
  Genre.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Genre",
    }
  );
  return Genre;
};
