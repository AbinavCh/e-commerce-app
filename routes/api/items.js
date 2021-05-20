const express = require('express');
const router = express.Router();
const saltRounds = 10;
const bcrypt = require('bcrypt');

const User = require('../../models/Item').User;
const Basket = require('../../models/Item').Basket;

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (!err) {
      User.findOne({ username }, (err, foundUser) => {
        if (!err) {
          if (foundUser) {
            res.status(500);
            res.json({
              message: 'User already exists',
            });
            return;
          } else {
            const newUser = new User({ username: username, password: hash });
            newUser.save();
            res.json({
              message: 'register success',
            });
          }
        } else {
          res.status(404);
        }
      });
    } else {
      res.json({
        message: 'error finding user(register)',
      });
    }
  });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, foundUser) => {
    if (!err) {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result === true) {
            res.json({
              message: 'login success',
            });
          } else {
            res.status(403);
            res.json({
              message: 'incorrect password',
            });
            return;
          }
        });
      } else {
        res.status(403);
        res.json({
          message: 'user not found',
        });
        return;
      }
    } else {
      res.status(404);
    }
  });
});

router.post('/basket', (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const basketItems = req.body;

  User.findOne({ username }, (err, foundUser) => {
    if (!err) {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result !== true) {
            res.status(403);
            res.json({
              message: 'invalid access',
            });
            return;
          } else {
            Basket.findOne({ userId: foundUser._id }, (err, basket) => {
              if (!err) {
                if (!basket) {
                  Basket.create({
                    userId: foundUser._id,
                    basket: basketItems,
                  });
                  res.json({
                    message: 'Created basket',
                  });
                } else {
                  basket.basket = basketItems;
                  basket.save();
                  res.json({
                    message: 'item saved succesfully',
                  });
                }
              } else {
                res.json({
                  message: 'error finding the items(post)',
                });
              }
            });
          }
        });
      } else {
        res.json({
          message: 'No User found(post)',
        });
      }
    } else {
      res.json({
        message: 'error finding user(post)',
      });
    }
  });
});

router.get('/basket', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const user = await User.findOne({ username });
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result !== true) {
        res.status(403);
        res.json({
          message: 'invalid access',
        });
        return;
      }
    });
  } else {
    res.status(403);
    res.json({
      message: 'invalid access',
    });
    return;
  }
  Basket.findOne({ userId: user._id }, (err, found) => {
    if (!err) {
      if (found) {
        var { basket } = found;
        basket = [
          ...new Map(
            basket.map((item) => [JSON.stringify(item), item])
          ).values(),
        ];
        res.json(basket);
      } else {
        res.json({ message: 'No items found' });
        return;
      }
    } else {
      res.json({
        message: 'Error finding items(get)',
      });
    }
  });
});

router.delete('/basket', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const id_to_del = req.body;

  User.findOne({ username }, (err, foundUser) => {
    if (!err) {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result !== true) {
            res.status(403);
            res.json({
              message: 'invalid access',
            });
            return;
          } else {
            Basket.findOne({ userId: foundUser._id }, (err, basket) => {
              if (!err) {
                if (!basket) {
                  res.json({
                    message: 'No basket found',
                  });
                } else {
                  const basketItems = basket.basket.filter(
                    (item) => item.id !== id_to_del.id
                  );
                  basket.basket = basketItems;
                  basket.save();
                  res.json({
                    message: 'item deleted succesfully',
                  });
                }
              } else {
                res.json({
                  message: 'error finding the items(delete)',
                });
              }
            });
          }
        });
      } else {
        res.json({
          message: 'No User found(delete)',
        });
      }
    } else {
      res.json({
        message: 'error finding user(delete)',
      });
    }
  });
});

module.exports = router;
