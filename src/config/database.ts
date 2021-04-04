import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});
mongoose.connection.on('error', console.error.bind(console, 'db connection error:'));
