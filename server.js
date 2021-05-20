const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const port = process.env.PORT || 5000;

const path = require('path');

const items = require('./routes/api/items');
const app = express();

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/amazon', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENN === 'production') {
  app.use(express.static('client/build'));
}

app.use(morgan('tiny'));
app.use('/api/items', items);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
