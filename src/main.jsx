// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App.jsx";
import CadastroLentes from "./CadastroLentes.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <nav className="bg-blue-600 text-white p-4 flex justify-center gap-6">
        <Link to="/" className="hover:underline">Buscar Lentes</Link>
        <Link to="/cadastro" className="hover:underline">Cadastrar Lentes</Link>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<CadastroLentes />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
