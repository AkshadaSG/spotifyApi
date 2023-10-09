const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

router.post('/create', trackController.createTrack);
router.get('/isrc/:isrc', trackController.getTrackByISRC);
router.get('/artist/:artistName', trackController.getTracksByArtist);

module.exports = router;
