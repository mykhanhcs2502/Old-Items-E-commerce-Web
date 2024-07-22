import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MyBoughtItems from './pages/MyBoughtItems/MyBoughtItems';
// import MyStorePage from './pages/namkhoa/mystore';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoginPage from './pages/quangkhoi/loginpage'
import SignupPage from './pages/quangkhoi/signuppage'
import ShopUI from './pages/mykhanh/ShopUI'


import MyStorePage from './pages/namkhoa/mystore';

import PayMethod from './pages/PaymentMethod/PayMethod';
import Cart from './pages/Cart/Cart';
import HomePage from './pages/manhkhang/homePage';
import ProductDetails, {loader as itemLoader} from "./pages/manhkhang/productDetails";

import './styles.css'
import CategoryItemsPage, {loader as categoryItemsLoader} from "./pages/manhkhang/components/CategoryItemsPage";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <div>Hello world!</div>,
  },

  {
    path: "/user/:userid/orders",
    element: <MyBoughtItems />,
  },
  {
    path: "/store/:userId",
    element: <ShopUI />,
  },
  {
    path: "/mystore",
    element: <MyStorePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/payment",
    element: <PayMethod />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/home",
    element: <HomePage/>,
  },
  {
    path: "/product/:itemId",
    element: <ProductDetails/>,
    loader: itemLoader
  },
  {
    path: "/category/:categoryId",
    element: <CategoryItemsPage/>,
    loader: categoryItemsLoader
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);