// /src/components/Restante.js

import React from "react";
import chiriasi from "../utils/dateChiriasi";

const Restante = () => {
  // Filtrăm doar chiriașii care au restanțe
  const chiriasiCuRestante = chiriasi.filter(chirias => chirias.restante > 0);

  return (
    <div className="restante-chiriasi">
      <h2>Chiriași cu Restanțe</h2>
      {chiriasiCuRestante.length === 0 ? (
        <p>Nu există chiriași cu restanțe.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Restanțe</th>
            </tr>
          </thead>
          <tbody>
            {chiriasiCuRestante.map((chirias) => (
              <tr key={chirias.id}>
                <td>{chirias.nume}</td>
                <td>{chirias.restante} lei</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Restante;
