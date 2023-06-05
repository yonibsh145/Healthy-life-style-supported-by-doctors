import React, { useState } from 'react';
import './ProgramPage.css';

const ProgramPage = () => {
  const [programName, setProgramName] = useState('');
  const [programCategory, setProgramCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [shortDescription, setShortDescription] = useState('');
  const [actions, setActions] = useState([]);

  const handleAddAction = () => {
    // Code to handle adding a new action to the program
    // You can open a modal or a form to input action details
  };

  const handleSaveProgram = () => {
    // Code to save the program
  };

  const handleEditProgram= () => {
    // Code to edit the program
  };

  const handleDeleteAction = (actionIndex) => {
    // Code to delete an action from the program
    setActions((prevActions) =>
      prevActions.filter((_, index) => index !== actionIndex)
    );
  };

  return (
    <div className="program-container">
      <h1>Create a New Program</h1>

      <div>
        <label>Program Name:</label>
        <input
          type="text"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
        />
      </div>

      <div>
        <label>Program Category:</label>
        <select
          value={programCategory}
          onChange={(e) => setProgramCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </select>
      </div>

      <div>
        <label>Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value.split(','))}
        />
      </div>

      <div>
        <label>Short Description:</label>
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <button onClick={handleAddAction}>Add Action</button>
      </div>

      <h2>Actions:</h2>

      {actions.length === 0 ? (
        <p>No actions added.</p>
      ) : (
        <ul>
          {actions.map((action, index) => (
            <li key={index}>
              <h3>{action.name}</h3>
              <p>{action.description}</p>
              <p>Times: {action.times}</p>
              <p>Frequency: {action.frequency}</p>
              <button onClick={() => handleDeleteAction(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleSaveProgram}>Save</button>
      <button onClick={handleEditProgram}>Edit</button>
    </div>
  );
};

export default ProgramPage;