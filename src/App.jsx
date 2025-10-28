import React, { useState, useEffect } from "react";

export default function App() {
  const [esferico, setEsferico] = useState("");
  const [cilindrico, setCilindrico] = useState("");
  const [lentes, setLentes] = useState([]);
  const [resultado, setResultado] = useState([]);

  // 🔹 Buscar lentes cadastradas no servidor Express
 useEffect(() => {
  fetch("http://localhost:3001/lentes")
    .then((res) => {
      if (!res.ok) throw new Error("Falha ao carregar lentes");
      return res.json();
    })
    .then((data) => setLentes(data))
    .catch((err) => {
      console.error("Erro ao carregar lentes:", err);
      setLentes([]);
    });
}, []);

  // 🔹 Lógica de filtragem
  const handleSubmit = (e) => {
    e.preventDefault();

    const esf = parseFloat(esferico);
    const cil = parseFloat(cilindrico);

    if (isNaN(esf) || isNaN(cil)) {
      alert("Digite valores válidos para esférico e cilíndrico!");
      return;
    }

    const filtradas = lentes.filter((lente) => {
  const esfMin = parseFloat(lente.esferico_min);
  const esfMax = parseFloat(lente.esferico_max);
  const cilMin = parseFloat(lente.cilindrico_min);
  const cilMax = parseFloat(lente.cilindrico_max);
  const preco = parseFloat(lente.preco);

  return (
    esf >= esfMin &&
    esf <= esfMax &&
    cil >= cilMin &&
    cil <= cilMax
  );
});

    setResultado(filtradas);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Buscar Lentes</h1>
        <p className="text-gray-600 mb-6">
          Digite os graus da receita para procurar lentes compatíveis
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <input
            type="number"
            step="0.25"
            placeholder="Esférico (ex: -2.00)"
            value={esferico}
            onChange={(e) => setEsferico(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            required
          />

          <input
            type="number"
            step="0.25"
            placeholder="Cilíndrico (ex: -1.00)"
            value={cilindrico}
            onChange={(e) => setCilindrico(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition-all duration-300 w-full"
          >
            Buscar
          </button>
        </form>

        {/* Resultado da busca */}
        <div className="mt-6 text-left">
          {resultado.length > 0 ? (
            <ul className="space-y-3">
              {resultado.map((lente, index) => (
                <li
                  key={index}
                  className="border p-3 rounded-lg shadow-sm bg-gray-50"
                >
                  <p className="font-bold text-blue-700">{lente.marca}</p>
                  <p className="text-gray-600">{lente.tipo}</p>
                  <p className="text-sm text-gray-500">
                    Esf: {lente.esferico_min} → {lente.esferico_max} | Cil:{" "}
                    {lente.cilindrico_min} → {lente.cilindrico_max}
                  </p>
                  <p className="font-semibold text-green-600">
                    💰 R$ {lente.preco.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              {resultado.length === 0 && lentes.length > 0
                ? "Nenhuma lente encontrada 😢"
                : "Preencha os campos e clique em Buscar"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

