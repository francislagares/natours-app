const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DB_CONNECTION.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(process.env.DB_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful');
  });

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
