import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [suprafata, setSuprafata] = useState('');
  const [nume, setNume] = useState('');
  const [suprafataInchiriata, setSuprafataInchiriata] = useState('');
  const [chirieLunara, setChirieLunara] = useState('');
  const [chiriasi, setChiriasi] = useState([]);
  const [facturaGaz, setFacturaGaz] = useState('');
  const [facturaCurent, setFacturaCurent] = useState('');

  useEffect(() => {
    const chiriasiExistenti = JSON.parse(sessionStorage.getItem('chiriasi')) || [];
    const suprafataTotalaExistenta = sessionStorage.getItem('suprafataTotala') || '';
    const utilitatiExistente = JSON.parse(sessionStorage.getItem('utilitati')) || { gaz: '', curent: '' };

    setChiriasi(chiriasiExistenti);
    setSuprafata(suprafataTotalaExistenta);
    setFacturaGaz(utilitatiExistente.gaz);
    setFacturaCurent(utilitatiExistente.curent);
  }, []);

  const salveazaSuprafata = () => {
    sessionStorage.setItem('suprafataTotala', suprafata);
    alert('Suprafața totală a fost salvată!');
  };

  const salveazaFacturi = () => {
    const utilitati = {
      gaz: facturaGaz,
      curent: facturaCurent,
    };
    sessionStorage.setItem('utilitati', JSON.stringify(utilitati));
    alert('Facturile de gaz și curent au fost salvate!');
  };

  const adaugaChirias = () => {
    const chiriasNou = {
      id: chiriasi.length + 1,
      nume,
      suprafataInchiriata: parseFloat(suprafataInchiriata),
      chirieLunara: parseFloat(chirieLunara),
      restante: 0,
      utilitati: {
        gaz: 0,
        curent: 0,
      }
    };

    const chiriasiActualizati = [...chiriasi, chiriasNou];
    setChiriasi(chiriasiActualizati);
    sessionStorage.setItem('chiriasi', JSON.stringify(chiriasiActualizati));

    setNume('');
    setSuprafataInchiriata('');
    setChirieLunara('');

    alert('Chiriașul a fost adăugat!');
  };

  const calculeazaUtilitati = (chirias) => {
    const suprafataTotala = parseFloat(suprafata);
    const gazDePlata = (chirias.suprafataInchiriata / suprafataTotala) * parseFloat(facturaGaz);
    const curentDePlata = (chirias.suprafataInchiriata / suprafataTotala) * parseFloat(facturaCurent);

    return {
      gazDePlata: gazDePlata.toFixed(2),
      curentDePlata: curentDePlata.toFixed(2),
    };
  };

  const stergeChirias = (id) => {
    const chiriasiActualizati = chiriasi.filter(chirias => chirias.id !== id);
    setChiriasi(chiriasiActualizati);
    sessionStorage.setItem('chiriasi', JSON.stringify(chiriasiActualizati));
    alert('Chiriașul a fost șters!');
  };

  return (
    <div className="admin-page">
      <h2 style={{ textAlign: 'center' }}></h2>
      <div className="left-panel">
        <div className="form-section">
          <label>
            Suprafață totală (m²):
            <input
              type="number"
              value={suprafata}
              onChange={(e) => setSuprafata(e.target.value)}
            />
          </label>
          <button onClick={salveazaSuprafata}>Salvează Suprafață Totală</button>
        </div>
        <div className="form-section">
          <h3>Introdu Facturi Utilități</h3>
          <label>
            Factura Gaz (lei):
            <input
              type="number"
              value={facturaGaz}
              onChange={(e) => setFacturaGaz(e.target.value)}
            />
          </label>
          <label>
            Factura Curent (lei):
            <input
              type="number"
              value={facturaCurent}
              onChange={(e) => setFacturaCurent(e.target.value)}
            />
          </label>
          <button onClick={salveazaFacturi}>Salvează Facturi Utilități</button>
        </div>
      </div>

      <div className="right-panel">
        
        <div className="form-section">
          <h3>Chiriași</h3>
          <table>
            <thead>
              <tr>
                <th>Nume</th>
                <th>Suprafață (m²)</th>
                <th>Chirie (lei)</th>
                <th>Restanțe (lei)</th>
                <th>Gaz (lei)</th>
                <th>Curent (lei)</th>
                <th>Acțiune</th>
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
                    <td>{utilitati.gazDePlata}</td>
                    <td>{utilitati.curentDePlata}</td>
                    <td>
                      <button onClick={() => stergeChirias(chirias.id)}>Șterge</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="form-section">
          <h3>Adaugă Chiriaș</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Nume:
              <input
                type="text"
                value={nume}
                onChange={(e) => setNume(e.target.value)}
              />
            </label>
            <label>
              Suprafață Închiriată (m²):
              <input
                type="number"
                value={suprafataInchiriata}
                onChange={(e) => setSuprafataInchiriata(e.target.value)}
              />
            </label>
            <label>
              Chirie Lunară (lei):
              <input
                type="number"
                value={chirieLunara}
                onChange={(e) => setChirieLunara(e.target.value)}
              />
            </label>

            <button type="button" onClick={adaugaChirias}>Adaugă Chiriaș</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
