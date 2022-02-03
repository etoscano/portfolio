import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import "./Global/main.scss";

import { useState, useEffect } from 'react';
import Experience from './Experience/Experience.js'



function App() {

  const [experience, setExperience] = useState();
    
  useEffect(() => { 
          const experience = new Experience(document.querySelector('canvas.webgl'))
          setExperience(experience);
  }, []);

  return (
    <div className="app">

    <Header experience={experience}/>

    <canvas className="webgl"></canvas>
    {/* Some content that stays in all pages */}


    {/* <Footer/> */}

    </div>
  );
}

export default App;


