// /src/components/Utilitati.js

import React from "react";

const Utilitati = ({ chirias }) => {
  return (
    <div className="utilitati-chirias">
      <h4>Utilități pentru {chirias.nume}</h4>
      <p><strong>Cost Gaz:</strong> {chirias.utilitati.gaz} lei</p>
      <p><strong>Cost Curent:</strong> {chirias.utilitati.curent} lei</p>
    </div>
  );
};

export default Utilitati;
