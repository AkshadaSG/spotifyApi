// models/track.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

const Track = sequelize.define('Track', {
  isrc: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUri: {
    type: DataTypes.STRING,
  },
  // Add more fields as needed
});

Track.belongsToMany(Artist, { through: 'TrackArtist' }); // Many-to-many relationship with Artist model

module.exports = Track;
