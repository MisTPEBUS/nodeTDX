const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Route = sequelize.define('Route', {
  RouteUID: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  RouteID: {
    type: DataTypes.STRING
  },
  RouteNameZh: {
    type: DataTypes.STRING
  },
  RouteNameEn: {
    type: DataTypes.STRING
  },
  SubRouteUID: {
    type: DataTypes.STRING
  },
  SubRouteID: {
    type: DataTypes.STRING
  },
  SubRouteNameZh: {
    type: DataTypes.STRING
  },
  SubRouteNameEn: {
    type: DataTypes.STRING
  },
  Direction: {
    type: DataTypes.INTEGER
  },
  CityCode: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'Routes',
  timestamps: false
});

module.exports = Route;