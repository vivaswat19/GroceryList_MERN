require('dotenv').config();
require('./Config/databaseConfig');

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const userRouter = require('./Routes/userRoute');
const groupRouter = require('./Routes/groupRoute');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send("Hello World");
})

app.use('/users', userRouter);
app.use('/groups', groupRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})