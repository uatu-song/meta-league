
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './NexusBeingsTable.css';

const NexusBeingsTable = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Papa.parse('/data/metal_master_roster.csv', {
      header: true,
      download: true,
      complete: (results) => {
        setCharacters(results.data.filter(row => row.Name));
      }
    });
  }, []);

  const filtered = characters.filter(c => c.Name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="beings-table-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search by character name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table className="beings-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            {filtered[0] && Object.keys(filtered[0]).filter(k => k !== 'Photo' && k !== 'Name').map(col => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((char, idx) => (
            <tr key={idx}>
              <td>
                {char.Photo ? (
                  <img
                    src={char.Photo.startsWith('http') ? char.Photo : \`/images/\${char.Photo}\`}
                    alt={char.Name}
                    className="character-photo"
                  />
                ) : '—'}
              </td>
              <td>{char.Name}</td>
              {Object.keys(char).filter(k => k !== 'Photo' && k !== 'Name').map(col => (
                <td key={col}>{char[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NexusBeingsTable;
