import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../../Pages/Home";
import About from "../../Pages/About";
import Projects from "../../Pages/Projects";
import ErrorPage from "../../Pages/ErrorPage";


import "./Header.scss";

function Header() {
  return (
    <Router>
      <header className="header">
        {/* Links */}
        <nav className="header__nav">
            <ul className="header__list">
                <li className="header__item">
                  <Link className="header__link" to="/about"> About </Link>
                </li>
                <li className="header__item">
                 <Link className="header__link header__title" to="/"> - Eleonora Toscano - </Link>
                </li>                
                <li className="header__item">
                  <Link className="header__link" to="/projects"> Projects </Link>
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
