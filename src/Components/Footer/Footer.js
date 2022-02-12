import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react"
import Home from "../../Pages/Home";
import About from "../../Pages/About";
import ErrorPage from "../../Pages/ErrorPage";

function Footer() {
  return (
    <header className="footer">
    <p>Footer!</p>

    <Router>
        
      <nav>
        <Link to="/"> Footer Home Link</Link>
        <Link to="/about">Footer About Link</Link>
      </nav>

    </Router>
  </header>
  );
}

export default Footer;



