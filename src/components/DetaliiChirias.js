// /src/components/DetaliiChirias.js

import React from "react";

const DetaliiChirias = ({ chirias }) => {
  if (!chirias) return null;

  return (
    <div className="detalii-chirias">
      <h2>Detalii Chiriaș</h2>
      <table>
        <tbody>
          <tr>
            <th>Nume</th>
            <td>{chirias.nume}</td>
          </tr>
          <tr>
            <th>Suprafață Închiriată</th>
            <td>{chirias.suprafataInchiriata} mp</td>
          </tr>
          <tr>
            <th>Chirie Lunară</th>
            <td>{chirias.chirieLunara} lei</td>
          </tr>
          <tr>
            <th>Cost Gaz</th>
            <td>{chirias.utilitati.gaz} lei</td>
          </tr>
          <tr>
            <th>Cost Curent</th>
            <td>{chirias.utilitati.curent} lei</td>
          </tr>
          <tr>
            <th>Restanțe</th>
            <td>{chirias.restante} lei</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetaliiChirias;
