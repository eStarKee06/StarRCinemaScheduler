'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.scheduleAssociation =  this.hasMany(models.Schedule, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  Showing.init({
    tmdb_id: { // this is the id to tmdb api
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Showing',
  });
  return Showing;
};