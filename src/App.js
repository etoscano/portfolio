import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import "./Global/main.scss";

// import "./Global/threejs.js";


import Experience from './Experience/Experience.js'

document.addEventListener("DOMContentLoaded", () => {  
    console.log("done");
    const experience = new Experience(document.querySelector('canvas.webgl'))

    // window.onload = function() {
    //     experience.showSection.showSection(window.location.hash)
    //     console.log(window.location.hash)
    //     experience.pageManager.setCurrentPage(window.location.hash)
    //   }
});



function App() {
  return (
    <div className="app">

    <Header/>

    <canvas className="webgl"></canvas>
    {/* Some content that stays in all pages */}


    {/* <Footer/> */}

    </div>
  );
}

export default App;


