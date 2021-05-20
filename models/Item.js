const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = require('mongoose').Types.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
});

const basketSchema = new mongoose.Schema({
  userId: Schema.ObjectId,
  basket: [
    {
      id: Number,
      title: String,
      url: String,
      price: Number,
      rating: String,
    },
  ],
});

const User = mongoose.model('User', userSchema);
const Basket = mongoose.model('Basket', basketSchema);

module.exports.User = User;

module.exports.Basket = Basket;
