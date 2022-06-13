import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import "./Global/main.scss";

import React from 'react';



function App() {

  return (
    <div className="app">

    <Header />

    {/* <canvas className="webgl"></canvas> */}
    {/* Some content that stays in all pages */}
      
      Hello world!

    <Footer/>

    </div>
  );
}

export default App;


