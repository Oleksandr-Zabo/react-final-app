import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Footer from './components/Footer';

function Home() {
  return (
    <main className="page-content">
      <h1>Home</h1>
      <p>Welcome to the homepage.</p>
    </main>
  );
}

function About() {
  return (
    <main className="page-content">
      <h1>About</h1>
      <p>About us page placeholder.</p>
    </main>
  );
}

function Contact() {
  return (
    <main className="page-content">
      <h1>Contact</h1>
      <p>Contact page placeholder.</p>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="site-header">
          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
