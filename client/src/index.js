import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProductStore from './store/ProductStore';
import UserStore from './store/UserStore';
import CartStore from './store/CartStore'

export const appContext = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <appContext.Provider value={{
    user: new UserStore(),
    products: new ProductStore(),
    cart: new CartStore(),
  }}>
    <App />
  </appContext.Provider>
);