const express = require('express');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Middleware and body parser setup
// Middleware and body parser setup
app.use(morgan('dev')); // Log HTTP requests to the console in development mode
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded request bodies


// Use routes
app.use('/api/tracks', trackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});
