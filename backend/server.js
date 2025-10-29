import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());


app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user || user.senha !== senha)
    return res.status(401).json({ erro: "Credenciais inválidas" });
  res.json({ usuario: { id: user.id, nome: user.nome, email: user.email } });
});

 
app.get("/api/insumos", async (req, res) => {
  const q = (req.query.q || "").toString();
  const where = q
    ? { OR: [
        { nome: { contains: q, mode: "insensitive" } },
        { categoria: { contains: q, mode: "insensitive" } },
      ] }
    : {};
  const insumos = await prisma.insumo.findMany({ where, orderBy: { nome: "asc" } });
  res.json(insumos);
});

 
app.post("/api/insumos", async (req, res) => {
  const { nome, categoria, estoque_minimo, estoque_atual } = req.body;
  if (!nome || !categoria) return res.status(400).json({ erro: "Campos obrigatórios." });
  await prisma.insumo.create({
    data: {
      nome,
      categoria,
      estoque_minimo: Number(estoque_minimo ?? 0),
      estoque_atual: Number(estoque_atual ?? 0),
    },
  });
  res.status(201).json({ sucesso: true });
});

 
app.put("/api/insumos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { nome, categoria, estoque_minimo, estoque_atual } = req.body;
  try {
    await prisma.insumo.update({
      where: { id },
      data: { nome, categoria, estoque_minimo: Number(estoque_minimo), estoque_atual: Number(estoque_atual) },
    });
    res.json({ sucesso: true });
  } catch {
    res.status(404).json({ erro: "Insumo não encontrado" });
  }
});

 
app.delete("/api/insumos/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.insumo.delete({ where: { id } });
    res.json({ sucesso: true });
  } catch {
    res.status(404).json({ erro: "Insumo não encontrado" });
  }
});

 
app.post("/api/movimentos", async (req, res) => {
  const { insumo_id, tipo, quantidade, data } = req.body;
  const ins = await prisma.insumo.findUnique({ where: { id: Number(insumo_id) } });
  if (!ins) return res.status(404).json({ erro: "Insumo não encontrado" });

  let novo = ins.estoque_atual;
  const q = Number(quantidade);
  if (tipo === "entrada") novo += q;
  else if (tipo === "saida") {
    if (q > ins.estoque_atual) return res.status(400).json({ erro: "Estoque insuficiente" });
    novo -= q;
  } else return res.status(400).json({ erro: "Tipo inválido" });

  await prisma.movimentacao.create({
    data: { insumoId: ins.id, tipo, quantidade: q, data },
  });
  await prisma.insumo.update({ where: { id: ins.id }, data: { estoque_atual: novo } });

  const alerta = novo < ins.estoque_minimo;
  res.json({ novoEstoque: novo, alerta });
});

 
app.get("/api/movimentos", async (req, res) => {
  const movs = await prisma.movimentacao.findMany({
    orderBy: { id: "desc" },
    include: { insumo: true }
  });
  res.json(movs.map(m => ({
    id: m.id,
    insumo_nome: m.insumo.nome,
    tipo: m.tipo,
    quantidade: m.quantidade,
    data: m.data
  })));
});

app.listen(3001, () => console.log("API rodando em http://localhost:3001"));