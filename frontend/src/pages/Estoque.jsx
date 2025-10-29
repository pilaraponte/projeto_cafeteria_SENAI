import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import React from "react";
import "./Estoque.css";

function insertionSortByName(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j].nome.localeCompare(key.nome) > 0) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}

export default function Estoque() {
  const [insumos, setInsumos] = useState([]);
  const [sel, setSel] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [qtd, setQtd] = useState(1);
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [msg, setMsg] = useState("");
  const [movs, setMovs] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api.insumos().then((l) => setInsumos(insertionSortByName(l)));
    api.movimentos().then(setMovs);
  }, []);

  async function movimentar() {
    setMsg("");
    if (!sel) return setMsg("Selecione um insumo");
    if (qtd <= 0) return setMsg("Quantidade deve ser > 0");

    const r = await api.movimentar({
      insumo_id: Number(sel),
      tipo,
      quantidade: Number(qtd),
      data,
    });

    if (r.alerta) alert(" Atenção: estoque abaixo do mínimo configurado!");
    setMsg(`Movimentação registrada. Novo estoque: ${r.novoEstoque}`);
    setInsumos(insertionSortByName(await api.insumos()));
    setMovs(await api.movimentos());
  }

  return (
    <div className="estoque-container">
      <div className="estoque-header">
        <h2>Gestão de Estoque</h2>
        <button className="btn-voltar" onClick={() => nav("/dashboard")}>
          ← Voltar
        </button>
      </div>

      <div className="movimentacao-form">
        <select value={sel} onChange={(e) => setSel(e.target.value)}>
          <option value="">Selecione um insumo</option>
          {insumos.map((i) => (
            <option key={i.id} value={i.id}>
              {i.nome} (Atual: {i.estoque_atual})
            </option>
          ))}
        </select>

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <input
          type="number"
          value={qtd}
          onChange={(e) => setQtd(e.target.value)}
          min="0.01"
          step="0.01"
          placeholder="Quantidade"
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button className="btn-registrar" onClick={movimentar}>
          Registrar
        </button>
      </div>

      {msg && <div className="msg-status">{msg}</div>}

      <h3 className="historico-title">Histórico de Movimentações</h3>
      <table className="tabela-estoque">
        <thead>
          <tr>
            <th>ID</th>
            <th>Insumo</th>
            <th>Tipo</th>
            <th>Qtd</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {movs.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.insumo_nome}</td>
              <td className={m.tipo === "saida" ? "saida" : "entrada"}>
                {m.tipo}
              </td>
              <td>{m.quantidade}</td>
              <td>{m.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
