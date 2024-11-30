// src/app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/userRoutes');
const loanRouts = require('../routes/loanRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    //allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', loanRouts);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});