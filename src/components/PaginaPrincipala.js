import React, { useState, useEffect } from 'react';

const PaginaPrincipala = () => {
  const [chiriasi, setChiriasi] = useState([]);
  const [facturaGaz, setFacturaGaz] = useState(0);
  const [facturaCurent, setFacturaCurent] = useState(0);
  const [suprafataTotala, setSuprafataTotala] = useState(0);

  useEffect(() => {
    const chiriasiExistenti = JSON.parse(sessionStorage.getItem('chiriasi')) || [];
    const utilitatiExistente = JSON.parse(sessionStorage.getItem('utilitati')) || { gaz: 0, curent: 0 };
    const suprafataExistenta = parseFloat(sessionStorage.getItem('suprafataTotala')) || 0;

    setChiriasi(chiriasiExistenti);
    setFacturaGaz(utilitatiExistente.gaz);
    setFacturaCurent(utilitatiExistente.curent);
    setSuprafataTotala(suprafataExistenta);
  }, []);

  const calculeazaUtilitati = (chirias) => {
    if (suprafataTotala === 0) return { gaz: 0, curent: 0 };
    const gazDePlata = (chirias.suprafataInchiriata / suprafataTotala) * facturaGaz;
    const curentDePlata = (chirias.suprafataInchiriata / suprafataTotala) * facturaCurent;

    return {
      gaz: gazDePlata.toFixed(2),
      curent: curentDePlata.toFixed(2),
    };
  };

  return (
    <div>
      <h2>Home</h2>
      <table>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Suprafață (m²)</th>
            <th>Chirie (lei)</th>
            <th>Restanțe (lei)</th>
           
          </tr>
        </thead>
        <tbody>
          {chiriasi.map((chirias) => {
            const utilitati = calculeazaUtilitati(chirias);
            return (
              <tr key={chirias.id}>
                <td>{chirias.nume}</td>
                <td>{chirias.suprafataInchiriata}</td>
                <td>{chirias.chirieLunara}</td>
                <td>{chirias.restante}</td>
           
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaginaPrincipala;
