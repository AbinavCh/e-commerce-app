import { Checkbox } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import logo from '../Folder/logos/ama.PNG';
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

const SubTotal = () => {
  const [{ basket }] = useStateValue();
  const [credentials] = useContext(CredentialsContext);
  let history = useHistory();

  var sum = 0;
  basket.forEach((item) => {
    sum += item.price;
  });

  const login = () => {
    if (credentials) {
      history.push('/payment');
    } else {
      history.push('/login');
      window.location.reload(false);
    }
  };

  return (
    <div className='total'>
      <img src={logo} alt='' />
      <div className='container'>
        <h6>
          SubTotal({basket.length} items): ${sum.toFixed(2)}
        </h6>
        <p>
          <Checkbox />
          This item contains a gift
        </p>
        <button onClick={login}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default SubTotal;
