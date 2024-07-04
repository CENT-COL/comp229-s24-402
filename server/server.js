const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Routes
const projectsRoutes = require('./routes/projects');
const usersRoutes = require('./routes/users');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express(); //exactly as connect();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);

app.use('/api/data', (req, res, next) => {
    res.json({ message: 'Hello from the server!' });
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));