'use strict';

const { createSlug } = require('../helpers/slug')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsTo(models.Genre, { foreignKey: 'genreId', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
      Movie.hasMany(models.Cast, { foreignKey: 'movieId', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min(value) {
          if (+value < 1) throw ('Minimum rating is 1')
        }
      }
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });

  Movie.beforeCreate(movie => {
    movie.slug = createSlug(movie.title)
  })

  return Movie;
};