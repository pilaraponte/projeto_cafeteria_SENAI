import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const nav = useNavigate();

  async function entrar(e) {
    e.preventDefault();
    const r = await api.login(email, senha);
    if (r.erro) setErro(r.erro);
    else {
      localStorage.setItem("usuario", JSON.stringify(r.usuario));
      nav("/dashboard");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={entrar} className="login-form">
          <input className="login-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="login-input" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button className="login-button">Entrar</button>
          {erro && <p className="login-error">{erro}</p>}
        </form>
      </div>
    </div>
  );
}