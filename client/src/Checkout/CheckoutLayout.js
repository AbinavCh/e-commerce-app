import React, { useContext } from 'react';
import { useStateValue } from '../StateProvider';
import './Checkout.css';
import { CredentialsContext } from '../App';

export default function CheckoutLayout({ id, title, url, price, rating }) {
  const [, dispatch] = useStateValue();
  const [credentials] = useContext(CredentialsContext);

  const persist = (id_to_del) => {
    fetch(`/api/items/basket`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials ? credentials.username : null}:${
          credentials ? credentials.password : null
        }`,
      },
      body: JSON.stringify(id_to_del),
    });
  };

  const RemoveFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
    persist({ id });
  };

  return (
    <div className='card mb-3'>
      <div className='row g-0'>
        <div className='col-md-4'>
          <img src={url} alt='...' />
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <h6 className='card-text'>${price}</h6>
            <p className='card-text'>{rating}</p>
            <button key={id} onClick={RemoveFromBasket}>
              Remove From Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
