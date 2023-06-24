import React, { useState } from 'react';
import './Library.css';


const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data for the programs
  const programs = [
    { name: 'Sets of Gods', numbers: '6 Programs', rating: 4.5 },
    { name: 'Program B', numbers: '4 Programs', rating: 4.6 },
    { name: 'Program C', numbers: '8 Programs', rating: 3.9 },
    // Add more program objects here...
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPrograms = programs.filter((program) =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Library</h1>

      <input
        type="text"
        placeholder="Search program name"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>Library Name</th>
            <th>Programs number</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrograms.map((program, index) => (
            <tr key={index}>
              <td>{program.name}</td>
              <td>{program.numbers}</td>
              <td>{program.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Library;