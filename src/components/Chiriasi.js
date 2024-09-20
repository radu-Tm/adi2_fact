import React, { useState, useEffect } from "react";
import chiriasiInitial from "../utils/dateChiriasi"; 
import DetaliiChirias from "./DetaliiChirias";

function setChiriasiInCookie(chiriasi) {
  sessionStorage.setItem('chiriasi', JSON.stringify(chiriasi));
}


function getChiriasiFromCookie() {
  const chiriasiCookie = sessionStorage.getItem('chiriasi');
  return chiriasiCookie ? JSON.parse(chiriasiCookie) : null;
}

const Chiriasi = () => {
  const [chiriasi, setChiriasi] = useState([]);
  const [chiriasSelectat, setChiriasSelectat] = useState(null);

  useEffect(() => {
   
    const chiriasiDinCookie = getChiriasiFromCookie();
    if (chiriasiDinCookie) {
      setChiriasi(chiriasiDinCookie);
    } else {
      setChiriasi(chiriasiInitial); 
      setChiriasiInCookie(chiriasiInitial); 
    }
  }, []);


  const stergeChirias = (id) => {
    const chiriasiNou = chiriasi.filter(chirias => chirias.id !== id);
    setChiriasi(chiriasiNou); 
    setChiriasiInCookie(chiriasiNou); 
  };
  const adaugaChirias = (chiriasNou) => {
    const chiriasiExistenti = JSON.parse(sessionStorage.getItem('chiriasi')) || [];
    chiriasiExistenti.push(chiriasNou);
    sessionStorage.setItem('chiriasi', JSON.stringify(chiriasiExistenti));
  };
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
            <th>Acțiuni</th>
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
              <td>
                <button onClick={() => stergeChirias(chirias.id)}>Șterge</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {chiriasSelectat && <DetaliiChirias chirias={chiriasSelectat} />}
    </div>
  );
};

export default Chiriasi;
