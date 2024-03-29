import React, { useState } from 'react';
import { getGameByCode } from '../../services/gameService';
import { getorCreateUserByEmail} from '../../services/userService.js';
import Loader from '../loader/loader.js';

import './joinPoll.css';

export default function JoinPoll({setGame_id, setUser_id, setPage}) {
    // Function renders a small form asking for game_code and user_email and a submit button.
    // On submit, the function fetches the game_id from the game_code and the user_id from the user_email.

    // const [game_data, setGame_data] = useState({'game_question': '', 'game_code': ''});

    const [joinPollFormData, setJoinPollFormData] = useState({
        // Initialize form data fields
        game_code: '',
        user_email: '',
      });
      const [loading, setLoading] = React.useState(false);
    
      const handleJoinPollInputChange = (e) => {
        const { name, value } = e.target;
        console.log(joinPollFormData)
        setJoinPollFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleJoinPollFormSubmit = (e) => {
        e.preventDefault()
        console.log(joinPollFormData);
        setLoading(true);
    
        Promise.all([
          getGameByCode(joinPollFormData.game_code),
          getorCreateUserByEmail(joinPollFormData.user_email)
        ]).then(async([gameRes, userRes]) => {
          const gameData = await gameRes;
          let userData = await userRes;

          setUser_id(userData[0]['user_id']);
      
          setGame_id(gameData[0]['game_id']);
          // setUser_id(userData[0]['user_id']); // Assuming you have a setUserId function to set user_id state variable
          setLoading(false);
    
          console.log("Into the Poll Now!!");
          setPage('poll_form');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    
    return (
        <div>
            <form className="poll-form" onSubmit={handleJoinPollFormSubmit}>
                <table>
                  <tr>
                    <td>
                      <label htmlFor="game_code">Game Code:</label>
                    </td>
                    <td>
                      <input type="text" id="game_code" name="game_code" value={joinPollFormData.game_code} onChange={handleJoinPollInputChange}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="user_email">User Email:</label>
                    </td>
                    <td>
                      <input type="text" id="user_email" name="user_email" value={joinPollFormData.user_email} onChange={handleJoinPollInputChange}/>
                    </td>
                  </tr>
                </table>
                
                <input  className="submit-button" type="submit" value="Submit" />
                {loading && <Loader />}
            </form>
        </div>
    );
}