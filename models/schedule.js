'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Schedule.init({
    start_date: { 
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: { 
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue:null
    },
    tmdb_id: { 
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};