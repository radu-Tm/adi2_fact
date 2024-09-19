// /src/components/PaginaPrincipala.js

import React, { useState, useEffect } from "react";
import Chiriasi from "./Chiriasi";

const PaginaPrincipala = () => {
  const [suprafataTotala, setSuprafataTotala] = useState(0);

  useEffect(() => {
    // Citește ses
    const suprafata = sessionStorage.getItem('suprafataTotala');
    if (suprafata) {
      setSuprafataTotala(Number(suprafata));
    }
  }, []);

  return (
    <div>
      <h2>Pagina Principală</h2>
      <Chiriasi suprafataTotala={suprafataTotala} />
      <p>Suprafață Totală: {suprafataTotala} mp</p>
    </div>
  );
};

export default PaginaPrincipala;
