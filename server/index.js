const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const linksRouter = require('./src/routes/favlinks');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Simple health check
app.get('/', (req, res) => {
  res.send('FavLinks API is running');
});

// Routes
app.use('/api/links', linksRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
