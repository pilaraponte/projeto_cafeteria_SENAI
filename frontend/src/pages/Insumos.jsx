import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./Insumos.css";

export default function Insumos() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    estoque_minimo: 0,
    estoque_atual: 0,
  });
  const [editing, setEditing] = useState(null);
  const nav = useNavigate();

  async function carregar() {
    setLista(await api.insumos());
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    if (!form.nome || !form.categoria)
      return alert("Preencha nome e categoria");

    if (editing) {
      await api.editarInsumo(editing.id, form);
    } else {
      await api.criarInsumo(form);
    }

    setForm({ nome: "", categoria: "", estoque_minimo: 0, estoque_atual: 0 });
    setEditing(null);
    await carregar();
  }

  async function excluir(id) {
    if (!confirm("Excluir este insumo?")) return;
    await api.excluirInsumo(id);
    await carregar();
  }

  function voltar() {
    nav("/dashboard");
  }

  return (
    <div className="insumos-container">
      <div className="insumos-header">
        <h2>Cadastro de Insumos</h2>
        <button className="btn-voltar" onClick={voltar}>
          ← Voltar
        </button>
      </div>

      <table className="tabela-insumos table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Mínimo</th>
            <th>Atual</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((i) => (
            <tr key={i.id}>
              <td>{i.nome}</td>
              <td>{i.categoria}</td>
              <td>{i.estoque_minimo}</td>
              <td>{i.estoque_atual}</td>
              <td>
                <button
                  onClick={() => {
                    setEditing(i);
                    setForm(i);
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => excluir(i.id)}
                  style={{ marginLeft: 6 }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editing ? "Editar Insumo" : "Novo Insumo"}</h3>

      <div className="form-insumo">
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <input
          placeholder="Categoria"
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        />
        <input
          type="number"
          placeholder="Estoque mínimo"
          value={form.estoque_minimo}
          onChange={(e) =>
            setForm({ ...form, estoque_minimo: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Estoque atual"
          value={form.estoque_atual}
          onChange={(e) =>
            setForm({ ...form, estoque_atual: Number(e.target.value) })
          }
        />
      </div>

      <button className="btn-salvar" onClick={salvar}>
        {editing ? "Salvar alterações" : "Criar insumo"}
      </button>
    </div>
  );
}
