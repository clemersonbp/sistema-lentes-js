import { useState } from "react";

export default function CadastroLentes() {
  const [form, setForm] = useState({
    marca: "",
    tipo: "",
    esferico_min: "",
    esferico_max: "",
    cilindrico_min: "",
    cilindrico_max: "",
    preco: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3001/lentes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setMensagem(data.mensagem);

    // limpar o formulário
    setForm({
      marca: "",
      tipo: "",
      esferico_min: "",
      esferico_max: "",
      cilindrico_min: "",
      cilindrico_max: "",
      preco: "",
    });
  } catch (error) {
    console.error("Erro ao salvar lente:", error);
    setMensagem("❌ Erro ao salvar lente. Verifique o servidor.");
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Cadastro de Lentes
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Marca e Tipo */}
          <input
            type="text"
            name="marca"
            value={form.marca}
            onChange={handleChange}
            placeholder="Marca da lente"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          <input
            type="text"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            placeholder="Tipo da lente"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

          {/* Esférico */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              step="0.25"
              name="esferico_min"
              value={form.esferico_min}
              onChange={handleChange}
              placeholder="Esférico Mín"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="number"
              step="0.25"
              name="esferico_max"
              value={form.esferico_max}
              onChange={handleChange}
              placeholder="Esférico Máx"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Cilíndrico */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              step="0.25"
              name="cilindrico_min"
              value={form.cilindrico_min}
              onChange={handleChange}
              placeholder="Cilíndrico Mín"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              type="number"
              step="0.25"
              name="cilindrico_max"
              value={form.cilindrico_max}
              onChange={handleChange}
              placeholder="Cilíndrico Máx"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Preço */}
          <input
            type="number"
            step="0.01"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            placeholder="Preço (R$)"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition-all duration-300"
          >
            Salvar
          </button>
        </form>

        {mensagem && (
          <p className="mt-6 text-green-600 text-center font-medium animate-fade-in">
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
}
