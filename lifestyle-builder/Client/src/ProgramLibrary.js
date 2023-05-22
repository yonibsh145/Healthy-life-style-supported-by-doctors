import React, { useState } from 'react';
import './ProgramLibrary.css';


const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data for the programs
  const programs = [
    { name: 'Program A', goals: 'Finish tasks', time: '2 hours', rating: 4.5 },
    { name: 'Program B', goals: 'Learn new skills', time: '1 hour', rating: 3.8 },
    { name: 'Program C', goals: 'Complete exercises', time: '45 minutes', rating: 4.2 },
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
      <h1>Program Library</h1>

      <input
        type="text"
        placeholder="Search program name"
        value={searchTerm}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>Program Name</th>
            <th>Daily Goals</th>
            <th>Estimate Time</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrograms.map((program, index) => (
            <tr key={index}>
              <td>{program.name}</td>
              <td>{program.goals}</td>
              <td>{program.time}</td>
              <td>{program.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Library;