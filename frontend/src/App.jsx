import "./theme.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Insumos from "./pages/Insumos";
import Estoque from "./pages/Estoque";
import React from "react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/insumos" element={<Insumos />} />
      <Route path="/estoque" element={<Estoque />} />
    </Routes>
  );
}