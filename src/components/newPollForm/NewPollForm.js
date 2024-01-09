import React, { useState } from 'react';

import './NewPollForm.css';

export default function NewPollForm({handleFormSubmit, handleInputChange, formData}) {

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

