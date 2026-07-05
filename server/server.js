require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log("mongodb success"))
        .catch(err => console.error("mongodb error", err.message));
} else {
    console.log("mongodb is disabled");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/posts', require('./routes/postRoutes'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
