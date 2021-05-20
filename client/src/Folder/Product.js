import React, { useContext, useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import './Product.css';
import { CredentialsContext } from '../App';
import './Product.css';

export default function Product({ id, title, url, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const [credentials] = useContext(CredentialsContext);
  var newItems = [];

  const persist = (newItems) => {
    fetch(`/api/items/basket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials ? credentials.username : null}:${
          credentials ? credentials.password : null
        }`,
      },
      body: JSON.stringify(newItems),
    }).then(() => {});
  };

  useEffect(() => {
    fetch(`/api/items/basket`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials ? credentials.username : null}:${
          credentials ? credentials.password : null
        }`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        //eslint-disable-next-line
        newItems = response;
        if (response) {
          if (
            newItems.message !== 'invalid access' &&
            newItems.message !== 'No items found'
          ) {
            newItems = [
              ...new Map(
                newItems.map((item) => [JSON.stringify(item), item])
              ).values(),
            ];
            newItems.map((ele) => {
              return dispatch({
                type: 'SET_BASKET',
                product: {
                  key: ele.id,
                  id: ele.id,
                  title: ele.title,
                  url: ele.url,
                  price: ele.price,
                  rating: ele.rating,
                },
              });
            });
          }
          dispatch({
            type: 'UNIQUE',
          });
        }
      });
  }, []);

  const addToBasket = (e) => {
    e.preventDefault();
    if (basket.filter((item) => id === item.id).length !== 0) {
      alert('Item already exists in the cart, please select items uniquely');
      return;
    }
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        key: id,
        id: id,
        title: title,
        url: url,
        price: price,
        rating: rating,
      },
    });

    const newItem = {
      key: id,
      id: id,
      title: title,
      url: url,
      price: price,
      rating: rating,
    };
    newItems = [...basket, newItem];
    persist(newItems);
  };

  return (
    <div className='card flex-box'>
      <h6 id='card-text'>{title}</h6>
      <h6 id='price'>${price}</h6>
      <div id='rating'>{rating}</div>
      <img
        id='product-image'
        src={url}
        className='card-img-top'
        alt='product'
      />
      <div>
        <button id='card-body' onClick={addToBasket}>
          Add to Basket
        </button>
      </div>
    </div>
  );
}
