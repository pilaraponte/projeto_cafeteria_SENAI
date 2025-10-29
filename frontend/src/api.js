const API = "http://localhost:3001/api";

export const api = {
  async login(email, senha) {
    const r = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    return r.json();
  },
  async insumos(q) {
    const url = q ? `${API}/insumos?q=${encodeURIComponent(q)}` : `${API}/insumos`;
    return (await fetch(url)).json();
  },
  async criarInsumo(dados) {
    return (await fetch(`${API}/insumos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    })).json();
  },
  async editarInsumo(id, dados) {
    return (await fetch(`${API}/insumos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    })).json();
  },
  async excluirInsumo(id) {
    return (await fetch(`${API}/insumos/${id}`, { method: "DELETE" })).json();
  },
  async movimentos() {
    return (await fetch(`${API}/movimentos`)).json();
  },
  async movimentar(dados) {
    return (await fetch(`${API}/movimentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    })).json();
  }
};