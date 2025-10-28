import React, { useState } from "react";
import lentesData from "./data/lentes.json?raw"; // <- import corrigido

const lentes = JSON.parse(lentesData); // <- converte o texto em JSON

export default function App() {
  const [esferico, setEsferico] = useState("");
  const [cilindrico, setCilindrico] = useState("");
  const [resultado, setResultado] = useState([]);

  const buscarLentes = (e) => {
    e.preventDefault();

    const lentesEncontradas = lentes.filter(
      (lente) =>
        esferico >= lente.esferico_min &&
        esferico <= lente.esferico_max &&
        cilindrico >= lente.cilindrico_min &&
        cilindrico <= lente.cilindrico_max
    );

    setResultado(lentesEncontradas);
  };

  return (

    
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Busca de Lentes</h1>
      <h1 className="text-4xl font-bold text-blue-600">Tailwind funcionando! 🎉</h1>

      <form onSubmit={buscarLentes} style={{ marginBottom: "1rem" }}>
        <div>
          <label>
            Esférico:
            <input
              type="number"
              step="0.25"
              value={esferico}
              onChange={(e) => setEsferico(parseFloat(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Cilíndrico:
            <input
              type="number"
              step="0.25"
              value={cilindrico}
              onChange={(e) => setCilindrico(parseFloat(e.target.value))}
            />
          </label>
        </div>
        <button type="submit">Buscar</button>
      </form>

      {resultado.length > 0 ? (
        <ul>
          {resultado.map((lente) => (
            <li key={lente.id}>
              {lente.nome} — R${lente.preco.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma lente encontrada.</p>
      )}
    </div>
  );

  return (
    
    <div className="flex h-screen items-center justify-center bg-blue-100">
      <h1 className="text-3xl font-bold text-blue-600">
        Tailwind funcionando! 🎉
      </h1>
    </div>
  );

}

