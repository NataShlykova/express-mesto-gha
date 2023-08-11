const express = require('express');
const mongoose = require('mongoose');
const celebrate = require('celebrate').errors;
const cookieParser = require('cookie-parser');
const { INTERNAL_ERROR_CODE } = require('./utils/Constans');
const errorHandler = require('./middlewares/handle-errors');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
app.use(cookieParser());
app.use('/', router);
app.use(celebrate());
app.use(errorHandler);

app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
  });
  next();
});

app.listen(PORT);
