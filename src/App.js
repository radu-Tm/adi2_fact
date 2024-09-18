import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleRowClick = (person) => {
    setSelectedPerson(person);
  };

  // date de luat prin API
  const data = [
    { id: 1, nume: 'Popescu', prenume: 'Ion', telefon: '0712345678', chiria_lunara: '1000 RON', suprafata: '50 m²', cota_parte: '25%', utilitati: '500 RON', sold: '1500 RON' },
    { id: 2, nume: 'Ionescu', prenume: 'Maria', telefon: '0723456789', chiria_lunara: '1200 RON', suprafata: '60 m²', cota_parte: '30%', utilitati: '600 RON', sold: '1800 RON' },
  ];

  return (
  <>
     <div class="header">
	 <img src={`${process.env.PUBLIC_URL}/srm.png`} alt="SRM"/>
	</div>
	<main>
    <div>
      <h1>Chriaşi cu 10 degete:</h1>
      <table>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Prenume</th>
            <th>Telefon</th>
            <th>Chiria Lunara</th>
            <th>Suprafata</th>
            <th>Cota Parte</th>
            <th>Utilitati</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {data.map(person => (
            <tr key={person.id} onClick={() => handleRowClick(person)}>
              <td>{person.nume}</td>
              <td>{person.prenume}</td>
              <td>{person.telefon}</td>
              <td>{person.chiria_lunara}</td>
              <td>{person.suprafata}</td>
              <td>{person.cota_parte}</td>
              <td>{person.utilitati}</td>
              <td>{person.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPerson && <Details person={selectedPerson} />}
    </div>
	</main>
	</>
  );
};

const Details = ({ person }) => {
 //ceva istoric
  const history = [
    { month: 'August', amount: '1000 RON' },
    { month: 'Septembrie', amount: '1100 RON' },
    { month: 'Octombrie', amount: '1200 RON' }
  ];

  return (
    <div className="details">
      <h2>Detalii pentru {person.nume} {person.prenume}</h2>
      <p><strong>Telefon:</strong> {person.telefon}</p>
      <p><strong>Chiria Lunara:</strong> {person.chiria_lunara}</p>
      <p><strong>Suprafata:</strong> {person.suprafata}</p>
      <p><strong>Cota Parte:</strong> {person.cota_parte}</p>
      <p><strong>Utilitati:</strong> {person.utilitati}</p>
      <p><strong>Sold:</strong> {person.sold}</p>

      <h3>Istoric pe ultimele 3 luni</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.month}</td>
              <td>{entry.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
