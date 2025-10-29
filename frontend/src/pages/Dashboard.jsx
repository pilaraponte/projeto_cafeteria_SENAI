import { useNavigate } from "react-router-dom";
import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const nav = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  function sair() {
    localStorage.removeItem("usuario");
    nav("/");
  }

  return (
    <>
      {/* 🔝 Navbar fixa */}
      <header className="navbar">
        <h1>Café SENAI</h1>
        <button onClick={sair}>Sair</button>
      </header>

      <div className="home-container">
        <h2>Bem-vindo, {usuario.nome || "Usuário"}!</h2>
        <p>Escolha uma das opções abaixo para gerenciar sua cafeteria:</p>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button className="hero-btn" onClick={() => nav("/insumos")}>
            Cadastro de Insumos
          </button>
          <button className="hero-btn" onClick={() => nav("/estoque")}>
            Gestão de Estoque
          </button>
          <button className="nav-login" onClick={sair}>
            Sair
          </button>
        </div>
      </div>

 
      <footer className="footer">
        <p>© 2025 Café SENAI</p>
      </footer>
    </>
  );
}
