const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8005;

// Connect to database

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({
        message:
            'Welcome to the Institutional Grammar Observation Research System (IGOR) API',
    });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/docs', require('./routes/docRoutes'));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
