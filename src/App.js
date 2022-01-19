// import Link from "./Components/Link/Link";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Leo!</p>

        <Router>

          <Link to="/"> Home Link</Link>
          <Link to="/about"> About Link</Link>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>

        </Router>
      </header>
    </div>
  );
}

export default App;
