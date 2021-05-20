import { useStateValue } from '../StateProvider';
import CheckoutLayout from './CheckoutLayout';

const CheckoutProduct = () => {
  const [{ basket }] = useStateValue();

  return (
    <div className='product'>
      <section>
        <h5>Hell o</h5>
        <h3>Your Shopping Basket</h3>
        <hr></hr>
      </section>
      {basket.map((item) => {
        return (
          <CheckoutLayout
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            rating={item.rating}
            url={item.url}
          />
        );
      })}
    </div>
  );
};

export default CheckoutProduct;
