const express = require('express');
const mongoose = require('mongoose');
const celebrateErrors = require('celebrate').errors;
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const { DEFAULT_ERROR_CODE } = require('./utils/Constans');
const handleErrors = require('./middlewares/handle-errors');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/', router);
app.use(celebrateErrors());
app.use(handleErrors);

app.use((err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message: statusCode === DEFAULT_ERROR_CODE ? 'Ошибка на сервере' : message,
  });
  next();
});

app.listen(PORT);
