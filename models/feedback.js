'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  feedback.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    subject: DataTypes.STRING,
    feedback: DataTypes.STRING,
    postedOn: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
  }, {
    sequelize,
    modelName: 'feedback',
  });
  return feedback;
};