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
      this.showingAssociation = this.belongsTo(models.Showing);
    }
  };
  Schedule.init({
    start_date: { 
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null
    },
    end_date: { 
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null
    },
    showing_id: { 
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
          model: 'Showings',
          key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};