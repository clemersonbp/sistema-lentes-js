// src/CadastroLentes.jsx
import { useState } from "react";

export default function CadastroLentes() {
  const [form, setForm] = useState({
    marca: "",
    tipo: "",
    preco: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Lente cadastrada: ${form.marca} - ${form.tipo} - R$${form.preco}`);
    setForm({ marca: "", tipo: "", preco: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Cadastro de Lentes
        </h1>

        <label className="block mb-4">
          <span className="text-gray-700">Marca:</span>
          <input
            type="text"
            name="marca"
            value={form.marca}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Tipo:</span>
          <input
            type="text"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Preço:</span>
          <input
            type="number"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
