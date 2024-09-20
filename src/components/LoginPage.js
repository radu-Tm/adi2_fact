import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; 

const LoginPage = () => {
  const [parolaIntroducere, setParolaIntroducere] = useState("");
  const navigate = useNavigate();

  // Verifică dacă există cookie-ul "loggedIn" la montarea componentei
  useEffect(() => {
    const isLoggedIn = document.cookie.split('; ').find(row => row.startsWith('loggedIn='));
    if (isLoggedIn && isLoggedIn.split('=')[1] === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const verificaParola = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/parola.txt');
      const parolaCorecta = await response.text();
      if (parolaIntroducere === parolaCorecta.trim()) {
        // Setează cookie-ul "loggedIn"
        document.cookie = "loggedIn=true; path=/;";

        // Redirecționează către pagina de admin
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
