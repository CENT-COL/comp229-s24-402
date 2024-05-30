const express  = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const projectsRoutes = require('./routes/projects');

// Connect to MongoDB
mongoose.connect('mongodb+srv://tdecasti:9gf65BQKaFwhE5Rc@cluster0.jynnwcf.mongodb.net/portfolio')

const app = express(); //exactly as connect();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/projects', projectsRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));