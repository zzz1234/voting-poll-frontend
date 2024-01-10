import React, { useState } from 'react';

import './NewPollForm.css';

import { createGame } from '../../services/gameService.js';

export default function NewPollForm({setGame_id, setPage}) {

  const [formData, setFormData] = useState({
    // Initialize form data fields
    game_name: '',
    no_of_votes: '',
    // Add more fields as needed
  });

  // const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
      e.preventDefault()
      console.log(formData);
      createGame(formData)
      .then(data => {
          console.log('Success:', data);
          setGame_id(data[0]['game_id']);
          console.log(data);
          alert("Poll created successfully!");
          setPage('add_choices');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

    return (
      <div className="new-poll-form">
        <h1 className="new-poll-form-title">Create a New Poll</h1>
        <form className='new-poll' onSubmit={handleFormSubmit}>
          <label className="input-name" for="poll-name">Poll Name:</label>
          <input className="input-val" type="text" id="poll-name" name="game_name" value={formData.game_name} onChange={handleInputChange}/>
          <br />
          <label className='input-name' for='poll-question'>Poll Question: </label>
          <input className="input-val" type="text" id="poll-question" name="game_question" value={formData.game_question} onChange={handleInputChange}/>
          <br />
          <label className="input-name" for="votes-per-person">No of votes per person:</label>
          <input className="input-val" type="number" id="votes-per-person" name="no_of_votes" value={formData.no_of_votes} onChange={handleInputChange}/>
          <br />
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    );
}

