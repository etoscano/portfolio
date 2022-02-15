import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { useState } from "react"

function Header(props) {
    const names = ['Home', 'About', 'Projects'];
    const [active, setActive] = useState(names[0]);

    function setSelected(name) {
        setActive(name);

        // Manage THREEJS transitions
        switch (name) {
          case 'Projects':
             experience.cameraProjects();
              break;
          case 'About':
              experience.cameraAbout();
              break;
          case 'Home':
              default:  
             experience.cameraDown();
              break;
      }
    }

    const experience = props.experience;

    const isAboutSelected = active === 'About';
    const isHomeSelected = active === 'Home';
    const isProjectsSelected = active === 'Projects';

  return (
    <Router>
      <header className="header" id="header">
        {/* Links */}
        <div className="header__wrapper">
          <div className="header__before"></div>
          <nav className="header__nav">
            <div className="header__innerBefore"></div>
            <ul className="header__list">
                <li className={`header__item ${isAboutSelected ? "header__item--active" : ""} `}>
                  <Link className="header__link" to="/about" onClick={() => setSelected('About')}> About </Link>
                </li>
                <li className={`header__item ${isHomeSelected ? "header__item--active" : ""} `}>
                  <Link className="header__link header__title" to="/" onClick={() => setSelected('Home')} > - Eleonora Toscano - </Link>
                </li>                
                <li className={`header__item ${isProjectsSelected ? "header__item--active" : ""} `}>
                  <Link className="header__link" to="/projects" onClick={() => setSelected('Projects')}> Projects </Link>
                </li>              
            </ul>        
            <div className="header__innerAfter"></div>     
          </nav>
          <div className="header__after"></div>  
        </div>
      </header>

    </Router>
  );
}

export default Header;
