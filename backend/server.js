const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const cors = require('cors');
const registerRoute = require("./register.js")

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Routes
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api/user', authRoutes);
app.use('/api/user', registerRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
