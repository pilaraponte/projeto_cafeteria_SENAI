import "./Home.css";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-logo">Café SENAI</div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <img
            src="/cafe.jpg"    
            alt="Café"
            className="hero-image"  
          />
          <h1>Bem-vindo ao Café SENAI</h1>
          <button className="hero-btn" onClick={() => nav("/login")}>
            Acessar Sistema
          </button>
        </div>
      </header>
    </div>
  );
}
