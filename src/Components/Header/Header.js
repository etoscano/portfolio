import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../../Pages/Home";
import About from "../../Pages/About";
import Projects from "../../Pages/Projects";
import ErrorPage from "../../Pages/ErrorPage";

import { useState } from 'react';

function Header(props) {
    const names = ['Home', 'About', 'Projects'];
    const [active, setActive] = useState(names[0]);
  // get prop experience

    function setSelected(name) {
        setActive(name);

        // Manage THREEJS transitions
        switch (name) {
          case 'Projects':
             experience.cameraProjects();
              break;
          case 'About':
              experience.cameraUp();
              break;
          case 'Home':
             experience.cameraDown();
              break;
      }
    }

    // setExperience(props.experience);
    const experience = props.experience;

    const isAboutSelected = active === 'About';
    const isHomeSelected = active === 'Home';
    const isProjectsSelected = active === 'Projects';

  return (
    <Router>
      <header className="header" id="header">
        {/* Links */}
        <nav className="header__nav">
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
        </nav>
      </header>

      {/* Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default Header;
