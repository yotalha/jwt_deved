const express = require('express');
const app = express();
const dotenv = require('dotenv');

const mongoose = require('mongoose');
const authRoute = require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => {
  console.log('DB Connected');
});

app.use(express.json());

app.use('/api/user', authRoute);

app.listen(3000, () => {
    console.log("Listening in port 3000")
})
