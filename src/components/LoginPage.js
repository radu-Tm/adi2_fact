import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; 

const LoginPage = () => {
  const [parolaIntroducere, setParolaIntroducere] = useState("");
  const navigate = useNavigate();

  const verificaParola = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/parola.txt');
      const parolaCorecta = await response.text();
      if (parolaIntroducere === parolaCorecta.trim()) {
        navigate('/admin');
      } else {
        alert("Parola introdusă este incorectă.");
      }
    } catch (error) {
      console.error("Eroare la verificarea parolei:", error);
    }
  };

  return (
    <div className="login-page">
      <h2>Pagina de Autentificare</h2>
      <form onSubmit={verificaParola}>
        <label>
          Parolă:
          <input
            type="password"
            value={parolaIntroducere}
            onChange={(e) => setParolaIntroducere(e.target.value)}
          />
        </label>
        <button type="submit">Autentificare</button>
      </form>
    </div>
  );
};

export default LoginPage;
