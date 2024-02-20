import React, { useState } from 'react';

import './NewPollForm.css';

import { createGame } from '../../services/gameService.js';
import Loader from '../loader/loader.js';

export default function NewPollForm({setGame_id, setPage}) {

  const [formData, setFormData] = useState({
    // Initialize form data fields
    game_name: '',
    game_question: '',
    no_of_votes: '',
    // Add more fields as needed
  });
  const [loading, setLoading] = React.useState(false);

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
      setLoading(true);
      createGame(formData)
      .then(data => {
          console.log('Success:', data);
          setGame_id(data[0]['game_id']);
          console.log(data);
          alert("Poll created successfully!");
          setLoading(false);
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
          <table>
            <tr>
              <td><label className="input-name" htmlFor="poll-name">Poll Name:</label></td>
              <td><input className="input-val" type="text" id="poll-name" name="game_name" value={formData.game_name} onChange={handleInputChange}/></td>
            </tr>
            <tr>
              <td><label className='input-name' htmlFor='poll-question'>Poll Question: </label></td>
              <td><input className="input-val" type="text" id="poll-question" name="game_question" value={formData.game_question} onChange={handleInputChange}/></td>
            </tr>
            <tr>
              <td><label className="input-name" htmlFor="votes-per-person">No of votes per person:</label></td>
              <td><input className="input-val" type="number" id="votes-per-person" name="no_of_votes" value={formData.no_of_votes} onChange={handleInputChange}/></td>
            </tr>
          </table>
          <input className="submit-button" type="submit" value="Submit" />
          {loading && <Loader />}
        </form>
      </div>
    );
}

