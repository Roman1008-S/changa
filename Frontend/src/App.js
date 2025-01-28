import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/CircleLoader";

import { loadUser } from './store/actions/userActions.js';
import Header from './components/Header'
import Footer from './components/Footer'
import Routers from './Routers.jsx'
import "./App.css";

const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div style={loaderStyle}>
          <ClipLoader color={"#ff0000"} loading={loading} size={200} />
        </div>
      ) : (
        <>
          <Header />
          <main>
            <Routers />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
