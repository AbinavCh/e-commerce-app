import React, { useState } from 'react';
import Home from './Home';
import Header from './Folder/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Product from './Folder/Product';
import CheckoutProduct from './Checkout/CheckoutProduct';
import SubTotal from './Checkout/SubTotal';
import Register from './backend/pages/Register';
import Login from './backend/pages/Login';
import Payment from './backend/pages/Payment';
import { ProductItems } from './Folder/ProductItems';

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);

  return (
    <div className='App'>
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Switch>
            <Route exact path='/register'>
              <Register />
            </Route>
            <Route exact path='/payment'>
              <Payment />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/checkout'>
              <Header />
              <SubTotal />
              <CheckoutProduct />
            </Route>
            <Route exact path='/'>
              <Header />
              <Home />
              <div className='flex-container'>
                {ProductItems.map((item) => {
                  return (
                    <Product
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
            </Route>
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
