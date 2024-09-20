import React, { useState, useEffect } from 'react';
import './Incasare.css';
const Incasare = () => {
  const [chiriasi, setChiriasi] = useState([]);
  const [selectedChirias, setSelectedChirias] = useState('');
  const [sumaPlata, setSumaPlata] = useState('');
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

  const gestioneazaPlata = () => {
    if (!selectedChirias || isNaN(sumaPlata) || sumaPlata <= 0) {
      alert("Te rog să selectezi un chiriaș și să introduci o sumă validă.");
      return;
    }

    const chiriasiActualizati = chiriasi.map(chirias => {
      if (chirias.nume === selectedChirias) {
        let sumaRamasa = parseFloat(sumaPlata);
        
        // Scădem din restanță
        const restantaNoua = Math.max(chirias.restante - sumaRamasa, 0);
        sumaRamasa -= (chirias.restante - restantaNoua); // Actualizăm suma rămasă după plata restanțelor

        // Scădem din chirie dacă mai este sumă
        const chirieNoua = Math.max(chirias.chirieLunara - sumaRamasa, 0);
        sumaRamasa -= (chirias.chirieLunara - chirieNoua); // Actualizăm suma rămasă după plata chiriei

        // Scădem din utilități dacă mai este sumă
        const utilitatiNou = { 
          gaz: Math.max(chirias.utilitati.gaz - sumaRamasa, 0),
          curent: Math.max(chirias.utilitati.curent - sumaRamasa, 0)
        };

        return {
          ...chirias,
          restante: restantaNoua,
          chirieLunara: chirieNoua,
          utilitati: utilitatiNou
        };
      }
      return chirias;
    });

    sessionStorage.setItem('chiriasi', JSON.stringify(chiriasiActualizati));
    setChiriasi(chiriasiActualizati);
    alert("Plata a fost înregistrată!");
  };

  const chiriasSelectat = chiriasi.find(chirias => chirias.nume === selectedChirias);
  const utilitati = chiriasSelectat ? calculeazaUtilitati(chiriasSelectat) : { gaz: 0, curent: 0 };

  return (
    <div>
      <h2>Încasare</h2>

      <label>
        Selectează chiriașul:
        <select value={selectedChirias} onChange={(e) => setSelectedChirias(e.target.value)}>
          <option value="">-- Selectează --</option>
          {chiriasi.map((chirias) => (
            <option key={chirias.id} value={chirias.nume}>
              {chirias.nume}
            </option>
          ))}
        </select>
      </label>

      <label>
        Suma plătită:
        <input
          type="number"
          value={sumaPlata}
          onChange={(e) => setSumaPlata(e.target.value)}
        />
      </label>

      <button onClick={gestioneazaPlata}>Înregistrează Plata</button>

      {chiriasSelectat && (
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Restanțe</th>
              <th>Gaz (lei)</th>
              <th>Curent (lei)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{chiriasSelectat.nume}</td>
              <td>{chiriasSelectat.restante} lei</td>
              <td>{utilitati.gaz} lei</td>
              <td>{utilitati.curent} lei</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Incasare;
