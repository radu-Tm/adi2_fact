// /src/components/Chiriasi.js

import React, { useState } from "react";
import chiriasi from "../utils/dateChiriasi";
import DetaliiChirias from "./DetaliiChirias";

const Chiriasi = () => {
  const [chiriasSelectat, setChiriasSelectat] = useState(null);

  const selecteazaChirias = (chirias) => {
    if (chiriasSelectat && chiriasSelectat.id === chirias.id) {
      setChiriasSelectat(null); 
    } else {
      setChiriasSelectat(chirias); 
    }
  };

  return (
    <div>
      <h2>Lista Chiriașilor</h2>
      <table>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Suprafață Închiriată</th>
            <th>Chirie Lunară</th>
            <th>Restanțe</th>
            <th>Gaz</th>
            <th>Curent</th>
          </tr>
        </thead>
        <tbody>
          {chiriasi.map((chirias) => (
            <tr key={chirias.id} onClick={() => selecteazaChirias(chirias)}>
              <td>{chirias.nume}</td>
              <td>{chirias.suprafataInchiriata} mp</td>
              <td>{chirias.chirieLunara} lei</td>
              <td>{chirias.restante} lei</td>
              <td>{chirias.utilitati.gaz} lei</td>
              <td>{chirias.utilitati.curent} lei</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Afișăm componenta DetaliiChirias doar dacă un chiriaș este selectat */}
      {chiriasSelectat && <DetaliiChirias chirias={chiriasSelectat} />}
    </div>
  );
};

export default Chiriasi;
