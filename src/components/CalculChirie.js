// /src/components/CalculChirie.js

import React from "react";
import chiriasi from "../utils/dateChiriasi";

const CalculChirie = () => {
  // Calculăm suprafața totală închiriată
  const suprafataTotala = chiriasi.reduce((total, chirias) => total + chirias.suprafataInchiriata, 0);

  return (
    <div className="calcul-chirie">
      <h2>Calcul Chirie în Funcție de Suprafață</h2>
      <table>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Suprafață Închiriată</th>
            <th>Procent din Total</th>
            <th>Chirie Lunară</th>
            <th>Total de Plătit</th>
          </tr>
        </thead>
        <tbody>
          {chiriasi.map((chirias) => {
            // Calculăm procentul din suprafața totală
            const procentSuprafata = (chirias.suprafataInchiriata / suprafataTotala) * 100;

            // Calculăm chiria totală pe baza procentului din suprafață
            const chirieDePlatit = chirias.chirieLunara;

            return (
              <tr key={chirias.id}>
                <td>{chirias.nume}</td>
                <td>{chirias.suprafataInchiriata} mp</td>
                <td>{procentSuprafata.toFixed(2)}%</td>
                <td>{chirieDePlatit} lei</td>
                <td>{chirieDePlatit} lei</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CalculChirie;
