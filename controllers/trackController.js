const { Track } = require('../models'); // Import Sequelize models
const { fetchTrackMetadata } = require('../services/spotifyService');

// Create a track and fetch metadata
const createTrack = async (req, res) => {
  try {
    const { isrc } = req.body;
    const spotifyData = await fetchTrackMetadata(isrc);

    // Create or update the track in the database
    const [track, created] = await Track.findOrCreate({
      where: { isrc },
      defaults: {
        title: spotifyData.name,
        imageUri: spotifyData.album.images[0].url,
        // Add more fields as needed
      },
    });

    res.status(201).json({ track, created });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get track by ISRC
const getTrackByISRC = async (req, res) => {
  try {
    const { isrc } = req.params;
    const track = await Track.findOne({ where: { isrc } });

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.status(200).json(track);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get tracks by artist name
const getTracksByArtist = async (req, res) => {
  try {
    const { artistName } = req.params;
    const tracks = await Track.findAll({
      where: { artistName: { [Op.like]: `%${artistName}%` } }, // Use Sequelize operators for case-insensitive search
    });

    res.status(200).json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createTrack, getTrackByISRC, getTracksByArtist };
