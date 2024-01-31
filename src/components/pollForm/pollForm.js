import { useState, useEffect } from "react";

import { VoteService, alreadyVotedService } from '../../services/voteService.js';

import './pollForm.css';

export default function PollForm({game_id, user_id}) {

    const [game_data, setGame_data] = useState({'game_question': '', 'game_code': ''});
    const [choices_data, setChoices_data] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    useEffect(() => {
        console.log('useEffect is running...');
        const render_question =  async () => {
            // e.preventDefault();
            console.log(game_id)
            console.log(user_id)
            let game_url = "http://127.0.0.1:8000/api/game/" + game_id;
            fetch(game_url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            }).then(response => response.json())
            .then(data => {
                console.log('Game data:', data);
                setGame_data(data);
                console.log(data['game_question']);
                return data['game_question'];
                // alert("Choices added successfully!");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };
        render_question();
    }, [game_id, user_id]);

    useEffect(() => {
        const set_choices = () => {
            const choices_url = "http://127.0.0.1:8000/api/game/" + game_id + "/choices";
            fetch(choices_url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            }).then(response => response.json())
            .then(data => {
                console.log('Choices data:', data);
                setChoices_data(data);
                // alert("Choices added successfully!");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        };
        set_choices();
    }, []);

    // Write a function render_vote_button() which renders a vote button. The vote button is rendered only if the user_id value is not null.
    const Render_vote_button = () => {
        const [alreadyVoted, setAlreadyVoted] = useState(null);
        
        useEffect(() => {
            alreadyVotedService(user_id, game_id)
              .then(result => {
                setAlreadyVoted(result);
              })
              .catch(error => {
                console.error('Error:', error);
              });
          }, [user_id, game_id]);

          if (alreadyVoted === true) {
            return <p>Already Voted</p>;
          } else if (user_id && alreadyVoted === false) {
            return <button disabled={selectedOptions.length !== game_data.no_of_votes}>Vote</button>;
          }
    }

    const handleOptionSelect = (optionId) => {
        const existingOption = selectedOptions.find((o) => o.choice_id === optionId);

        if (existingOption) {
        // Deselect option if it's already selected
        const updatedOptions = selectedOptions.filter((o) => o.choice_id !== optionId);
        
        const updatedOptionsWithPriority = updatedOptions.map((o, i) => ({
            choice_id: o.choice_id,
            priority: i + 1,
          }));

        setSelectedOptions(updatedOptionsWithPriority);
        } else {
        // Select the option and assign a priority
        const priority = selectedOptions.length + 1;
        setSelectedOptions([...selectedOptions, { choice_id: optionId, priority }]);
        }
        console.log(selectedOptions);
      };

    // Add a function render_choices which traverses through the choices_data array and renders the choices in a list and each choice with a radio button.
    const render_choices = () => {
        return choices_data.map((option) => (
            <div key={option.choice_id}>
                {selectedOptions.some((o) => o.choice_id === option.choice_id) && (
                <span><b>{selectedOptions.find((o) => o.choice_id === option.choice_id).priority}</b></span>
                )}
                {!selectedOptions.some((o) => o.choice_id === option.choice_id) && <span style={{ visibility: 'hidden' }}>0</span>}
                <label>
                    <input 
                    type="checkbox"
                    onChange={() => handleOptionSelect(option.choice_id)}
                    checked={selectedOptions.some((o) => o.choice_id === option.choice_id)}
                    />
                    {option.choice_value}
                </label>
                {<input className="comments" type="text" id={`comment${option.choice_id}`} /> }
            </div>
        ))
        // return choices;
    }

    // Add a function castVote which fetches the choice_id from the radio button, fetches user_id and sends a POST request to the backend to cast the vote.
    const castVote = (e) => {
        e.preventDefault();
        const updatedSelectedOptions = selectedOptions.map(option => {
            const comment = document.getElementById(`comment${option.choice_id}`).value;
            return {
                ...option,
                "comments": comment,
                "user_id": user_id,
                "game_id": game_id
            };
        });
        console.log(updatedSelectedOptions);
        const promises = updatedSelectedOptions.map(element => {
            return VoteService(element);
        })
        Promise.all(promises)
        .then(data => {
            console.log('Success:', data);
            // setAlreadyVoted(true);
            // alert("Vote casted successfully!");
        })
        .catch((error) => {
            alert(error);
            console.error('Error', error);
        });
    }

    return (
        <div className="poll-form">
            <h1>Cast your Vote Now!!!</h1>
            <h2> Your game code is {game_data['game_code']}. Use this code to join the game.</h2>
            <h3 id="game_question">{game_data['game_question']}</h3>
            <h4 id="vote_count"> You have to cast {game_data['no_of_votes']} votes.</h4>
            <form onSubmit={castVote}>
                {render_choices()}
                <br />
            {Render_vote_button()}
            </form>
        </div>
    );
}
