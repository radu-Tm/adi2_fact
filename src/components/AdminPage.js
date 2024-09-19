// /src/components/AdminPage.js

import React, { useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [suprafata, setSuprafata] = useState('');

  const salveazaSuprafata = () => {
    sessionStorage.setItem('suprafataTotala', suprafata);
    alert("Suprafața a fost salvată!");
  };

  return (
    <div className="admin-page">
      <h2>Pagina de Administrare</h2>
      <label>
        Suprafață totală (m²):
        <input
          type="number"
          value={suprafata}
          onChange={(e) => setSuprafata(e.target.value)}
        />
      </label>
      <button onClick={salveazaSuprafata}>Salvează</button>
    </div>
  );
};

export default AdminPage;
