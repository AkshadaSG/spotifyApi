const axios = require('axios');

// Spotify API configuration
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const CLIENT_ID = '4c510ea6bec2484ca3cc1e1637038001';
const CLIENT_SECRET = 'daa745c64abd46cbbd27c94ae5ad999c';

// Get Spotify access token
const getAccessToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    params: {
      grant_type: 'client_credentials',
    },
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SECRET,
    },
  });

  return response.data.access_token;
};

// Fetch track metadata by ISRC
const fetchTrackMetadata = async (isrc) => {
  const accessToken = await getAccessToken();
  const response = await axios.get(`${SPOTIFY_API_BASE}/search`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      q: `isrc:${isrc}`,
      type: 'track',
    },
  });

  return response.data.tracks.items[0]; // Get the first track (highest popularity)
};

module.exports = { fetchTrackMetadata };
