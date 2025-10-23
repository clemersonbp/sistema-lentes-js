// src/App.jsx
import { useState } from "react";

function App() {
  // Estado para armazenar os valores do formulário
  const [grauEsferico, setGrauEsferico] = useState("");
  const [grauCilindrico, setGrauCilindrico] = useState("");
  const [resultado, setResultado] = useState("");

  // Função executada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulação da busca de lente
    if (grauEsferico && grauCilindrico) {
      setResultado(`Buscando lentes para Esférico: ${grauEsferico}, Cilíndrico: ${grauCilindrico}`);
    } else {
      setResultado("Por favor, preencha ambos os campos.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Busca de Lentes</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Grau Esférico:</label>
          <input
            type="number"
            step="0.25"
            value={grauEsferico}
            onChange={(e) => setGrauEsferico(e.target.value)}
            placeholder="Ex: -2.00"
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Grau Cilíndrico:</label>
          <input
            type="number"
            step="0.25"
            value={grauCilindrico}
            onChange={(e) => setGrauCilindrico(e.target.value)}
            placeholder="Ex: -1.00"
          />
        </div>

        <button type="submit" style={styles.button}>
          Buscar Lente
        </button>
      </form>

      {resultado && <p style={styles.resultado}>{resultado}</p>}
    </div>
  );
}

// 🎨 Estilos simples usando JS (sem CSS externo por enquanto)
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "20px",
    color: "#2b2b2b",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resultado: {
    marginTop: "20px",
    color: "#333",
  },
};

export default App;
