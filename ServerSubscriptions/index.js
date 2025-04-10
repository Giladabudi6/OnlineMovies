const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
const membersRouter = require('./routers/membersRouter');
const moviesRouter = require('./routers/moviesRouter');
const subscriptionsRouter = require('./routers/subscriptionsRouter');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define API routes
app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/subscriptions', subscriptionsRouter);

// Start the server
app.listen(PORT, () => {
  // Entry Point (Base URL): http://localhost:3000
  console.log(`app is listening at http://localhost:${PORT}`);
});