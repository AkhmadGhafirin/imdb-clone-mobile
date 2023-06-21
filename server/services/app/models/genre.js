'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Genre.hasMany(models.Movie, { foreignKey: 'genreId', onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    }
  }
  Genre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Name already exists'
      },
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: 'Name is required'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};