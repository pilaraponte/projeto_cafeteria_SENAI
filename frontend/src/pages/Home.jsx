import "./Home.css";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-logo">Café SENAI</div>
        <div className="nav-links">
          <a href="#menu">Menu</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
          <button className="nav-login" onClick={() => nav("/login")}>Entrar</button>
        </div>
      </nav>
      <header className="hero-section">
        <div className="hero-content">
          <h1>Bem-vindo ao Sistema Café SENAI</h1>
          <button className="hero-btn" onClick={() => nav("/login")}>Acessar Sistema</button>
        </div>
      </header>

      <footer className="footer">
        <p>© 2025 Café SENAI</p>
      </footer>
    </div>
  );
}