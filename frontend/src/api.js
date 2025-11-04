const API = "http://localhost:3001/api";

// Função auxiliar segura para tratar respostas HTTP
async function handleResponse(r) {
  let data;
  try {
    data = await r.json();
  } catch {
    data = null;
  }

  if (!r.ok) {
    const msg = data?.erro || "Falha na requisição";
    throw new Error(msg);
  }

  return data;
}

export const api = {
  async login(email, senha) {
    const r = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    return handleResponse(r);
  },

  async insumos(q) {
    const url = q
      ? `${API}/insumos?q=${encodeURIComponent(q)}`
      : `${API}/insumos`;
    const r = await fetch(url);
    return handleResponse(r);
  },

  async criarInsumo(dados) {
    const r = await fetch(`${API}/insumos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    return handleResponse(r);
  },

  async editarInsumo(id, dados) {
    const r = await fetch(`${API}/insumos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    return handleResponse(r);
  },

  async excluirInsumo(id) {
    const r = await fetch(`${API}/insumos/${id}`, { method: "DELETE" });
    return handleResponse(r);
  },

  async movimentos() {
    const r = await fetch(`${API}/movimentos`);
    return handleResponse(r);
  },

  async movimentar(dados) {
    const r = await fetch(`${API}/movimentos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    return handleResponse(r);
  },
};
