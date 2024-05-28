const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Route = require('./Route');

const Stop = sequelize.define('Stop', {
  StopUID: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  StopID: {
    type: DataTypes.STRING
  },
  StopNameZh: {
    type: DataTypes.STRING
  },
  
  StopBoarding: {
    type: DataTypes.INTEGER
  },
  StopSequence: {
    type: DataTypes.INTEGER
  },

  PositionLat: {
    type: DataTypes.FLOAT
  },
  PositionLon: {
    type: DataTypes.FLOAT
  },

  StationID: {
    type: DataTypes.STRING
  },
  LocationCityCode: {
    type: DataTypes.STRING
  },
  RouteUID: {
    type: DataTypes.STRING,
    references: {
      model: Route,
      key: 'RouteUID'
    }
  }
}, {
  tableName: 'Stops',
  timestamps: false
});

Stop.belongsTo(Route, { foreignKey: 'RouteUID' });
Route.hasMany(Stop, { foreignKey: 'RouteUID' });

module.exports = Stop;
