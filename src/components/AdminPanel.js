// /src/components/AdminPanel.js

import React, { useState } from "react";

const AdminPanel = ({ setSuprafataTotala }) => {
  const [suprafata, setSuprafata] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suprafata > 0) {
      setSuprafataTotala(suprafata);
    } else {
      alert("Suprafața totală trebuie să fie un număr pozitiv.");
    }
  };

  return (
    <div className="admin-panel">
      <h2>Panou Administrativ</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Suprafață Totală (mp):
          <input
            type="number"
            value={suprafata}
            onChange={(e) => setSuprafata(e.target.value)}
          />
        </label>
        <button type="submit">Actualizează Suprafața Totală</button>
      </form>
    </div>
  );
};

export default AdminPanel;
