// /src/components/CalculUtilitati.js

import React from "react";
import chiriasi from "../utils/dateChiriasi";

const CalculUtilitati = () => {
  // Calculăm suprafața totală închiriată
  const suprafataTotala = chiriasi.reduce((total, chirias) => total + chirias.suprafataInchiriata, 0);

  return (
    <div className="calcul-utilitati">
      <h2>Calcul Utilități în Funcție de Suprafață</h2>
      <table>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Suprafață Închiriată</th>
            <th>Procent din Total</th>
            <th>Cost Gaz</th>
            <th>Cost Curent</th>
          </tr>
        </thead>
        <tbody>
          {chiriasi.map((chirias) => {
            // Calculăm procentul din suprafața totală
            const procentSuprafata = (chirias.suprafataInchiriata / suprafataTotala) * 100;

            return (
              <tr key={chirias.id}>
                <td>{chirias.nume}</td>
                <td>{chirias.suprafataInchiriata} mp</td>
                <td>{procentSuprafata.toFixed(2)}%</td>
                <td>{chirias.utilitati.gaz} lei</td>
                <td>{chirias.utilitati.curent} lei</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CalculUtilitati;
