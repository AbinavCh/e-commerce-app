import { AppBar, Button, InputBase, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from '../StateProvider';
import logo from './logos/Amazon.png';
//eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Product.css';

export default function Header() {
  const [{ basket }] = useStateValue();
  const [credentials, setCredentials] = useContext(CredentialsContext);
  let history = useHistory();

  const logout = () => {
    setCredentials(null);
    window.location.reload(false);
  };

  const login = () => {
    history.push('/login');
    window.location.reload(false);
  };

  return (
    <AppBar className='app-bar'>
      <Toolbar>
        <Link to='/'>
          <img className='image' src={logo} alt='amazon-logo' />
        </Link>
        <InputBase className='InputBase' />
        <Button id='Button' endIcon={<SearchIcon />} />
        <p className='para'>
          <span className='hello'>
            Hello,{' '}
            {credentials ? credentials.username : ' click below to sign In'}
          </span>
          <br />
          <span className='button'>
            {credentials ? (
              <button className='sign' onClick={logout}>
                Sign Out
              </button>
            ) : (
              <button className='sign' onClick={login}>
                Sign In
              </button>
            )}
          </span>
        </p>
        <p className='Returns'>
          <span className='returns'> Returns</span>
          <br />
          <span className='orders'> & Orders</span>
        </p>
        <p className='Prime'>
          <span className='your'> Your</span>
          <br />
          <span className='prime'>Prime</span>
        </p>
        <Link to='/checkout' className='icon'>
          <ShoppingBasketIcon id='basketIcon' />
        </Link>
        <h3 className='number'>{basket?.length}</h3>
      </Toolbar>
    </AppBar>
  );
}
