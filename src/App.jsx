import React, { useState, useEffect } from "react";

export default function App() {
  const [lentes, setLentes] = useState([]);
  const [od, setOd] = useState({ esferico: "", cilindrico: "", eixo: "" });
  const [oe, setOe] = useState({ esferico: "", cilindrico: "", eixo: "" });
  const [resultado, setResultado] = useState({ od: [], oe: [] });

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

  // 🔹 Lógica de filtragem de lentes compatíveis
  const buscarLentes = (esferico, cilindrico) => {
    const esf = parseFloat(esferico);
    const cil = parseFloat(cilindrico);

    if (isNaN(esf) || isNaN(cil)) return [];

    return lentes.filter((lente) => {
      const esfMin = parseFloat(lente.esferico_min);
      const esfMax = parseFloat(lente.esferico_max);
      const cilMin = parseFloat(lente.cilindrico_min);
      const cilMax = parseFloat(lente.cilindrico_max);

      return esf >= esfMin && esf <= esfMax && cil >= cilMin && cil <= cilMax;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const odLentes = buscarLentes(od.esferico, od.cilindrico);
    const oeLentes = buscarLentes(oe.esferico, oe.cilindrico);
    setResultado({ od: odLentes, oe: oeLentes });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Buscar Lentes
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Preencha os graus de cada olho para encontrar lentes compatíveis
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* -------- OLHO DIREITO -------- */}
          <div className="border rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
              Olho Direito (OD)
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="number"
                step="0.25"
                placeholder="Esférico"
                value={od.esferico}
                onChange={(e) => setOd({ ...od, esferico: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <input
                type="number"
                step="0.25"
                placeholder="Cilíndrico"
                value={od.cilindrico}
                onChange={(e) => setOd({ ...od, cilindrico: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <input
                type="number"
                step="1"
                placeholder="Eixo (opcional)"
                value={od.eixo}
                onChange={(e) => setOd({ ...od, eixo: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* -------- OLHO ESQUERDO -------- */}
          <div className="border rounded-xl p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
              Olho Esquerdo (OE)
            </h2>
            <div className="flex flex-col gap-3">
              <input
                type="number"
                step="0.25"
                placeholder="Esférico"
                value={oe.esferico}
                onChange={(e) => setOe({ ...oe, esferico: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <input
                type="number"
                step="0.25"
                placeholder="Cilíndrico"
                value={oe.cilindrico}
                onChange={(e) => setOe({ ...oe, cilindrico: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <input
                type="number"
                step="1"
                placeholder="Eixo (opcional)"
                value={oe.eixo}
                onChange={(e) => setOe({ ...oe, eixo: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* -------- BOTÃO -------- */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 py-3 transition-all duration-300"
            >
              Buscar Lentes Compatíveis
            </button>
          </div>
        </form>

        {/* -------- RESULTADOS -------- */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* OD Resultados */}
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-3">
              Resultados OD:
            </h3>
            {resultado.od.length > 0 ? (
              resultado.od.map((lente, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border p-4 rounded-lg mb-3 shadow-sm"
                >
                  <p className="font-semibold text-blue-700">
                    {lente.marca} - {lente.tipo}
                  </p>
                  <p className="text-sm text-gray-600">
                    Esf: {lente.esferico_min} → {lente.esferico_max} | Cil:{" "}
                    {lente.cilindrico_min} → {lente.cilindrico_max}
                  </p>
                  <p className="text-green-600 font-bold mt-1">
                    💰 R$ {Number(lente.preco).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                Nenhuma lente encontrada 😢
              </p>
            )}
          </div>

          {/* OE Resultados */}
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-3">
              Resultados OE:
            </h3>
            {resultado.oe.length > 0 ? (
              resultado.oe.map((lente, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border p-4 rounded-lg mb-3 shadow-sm"
                >
                  <p className="font-semibold text-blue-700">
                    {lente.marca} - {lente.tipo}
                  </p>
                  <p className="text-sm text-gray-600">
                    Esf: {lente.esferico_min} → {lente.esferico_max} | Cil:{" "}
                    {lente.cilindrico_min} → {lente.cilindrico_max}
                  </p>
                  <p className="text-green-600 font-bold mt-1">
                    💰 R$ {Number(lente.preco).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                Nenhuma lente encontrada 😢
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
