import { getGameByCode } from "../../services/gameService";
import React, { useState } from 'react';

import './resultsForm.css';

export default function ResultsForm({setGame_id, nextPageOnSubmit}) {
    const [game_code, setGame_code] = useState(''); // Initialize game_code state variable
    const handleResultPollFormSubmit = (e) => {
        e.preventDefault();
        setGame_code(document.getElementById('game_code').value);
        console.log({game_code});
        getGameByCode(game_code)
        .then(data => {
            console.log('Success:', data);
            setGame_id(data[0]['game_id']);
            nextPageOnSubmit('results_page');
            // alert("Choices added successfully!");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleResultPollInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setGame_code(value);
    }

    return (
        <div className="result-form-container">
            <form className="result-form" onSubmit={handleResultPollFormSubmit}>
            <table>
            <tr>
              <td><label htmlFor="game_code">Game Code:</label></td>
              <td><input type="text" id="game_code" name="game_code" value={game_code} onChange={handleResultPollInputChange}/></td>
            </tr>
            </table>
            <input className="submit-button" type="submit" value="Submit" />
            </form>
        </div>
    );
}