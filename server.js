// server.js
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3001;
const FILE_PATH = "./lentes.json";

app.use(cors());
app.use(express.json());

// 🔹 Criar arquivo se não existir
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, "[]");
}

// 🔹 Obter todas as lentes
app.get("/lentes", (req, res) => {
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  res.json(JSON.parse(data));
});

// 🔹 Cadastrar nova lente
app.post("/lentes", (req, res) => {

const novaLente = {
  ...req.body,
  esferico_min: parseFloat(req.body.esferico_min),
  esferico_max: parseFloat(req.body.esferico_max),
  cilindrico_min: parseFloat(req.body.cilindrico_min),
  cilindrico_max: parseFloat(req.body.cilindrico_max),
  preco: parseFloat(req.body.preco)
};



  const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));

  data.push(novaLente);
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

  res.json({ mensagem: "Lente cadastrada com sucesso!", lente: novaLente });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
