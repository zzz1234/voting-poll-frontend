import { useState, useEffect } from "react";

export default function PollForm({game_id, user_id}) {

    const [game_data, setGame_data] = useState({'game_question': '', 'game_code': ''});
    const [choices_data, setChoices_data] = useState([]);
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
    }, []);

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
    const render_vote_button = () => {
        if (user_id != null) {
            return <button>Vote</button>;
        }
    }

    // Add a function render_choices which traverses through the choices_data array and renders the choices in a list and each choice with a radio button.
    const render_choices = () => {
        let choices = [];
        for (let i=0; i<choices_data.length; i++) {
            choices.push(<div><input type="radio" id={choices_data[i]['choice_id']} name="choice" value={choices_data[i]['choice_id']} />{choices_data[i]['choice_value']}</div>);
        }
        return choices;
    }

    // Add a function castVote which fetches the choice_id from the radio button, fetches user_id and sends a POST request to the backend to cast the vote.
    const castVote = (e) => {
        e.preventDefault();
        const choice_id = document.querySelector('input[name="choice"]:checked').value;
        const api_url = 'http://localhost:8000/api/vote';
        const api_body = {
            'choice_id': choice_id,
            'user_id': user_id,
            'comments': 'No Reason',
            'game_id': game_id,
            'priority': 1
        }
        console.log(api_body);
        fetch(api_url, {
            method: 'POST',
            body: JSON.stringify(api_body),
            headers: {
            'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("Vote casted successfully!");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <h1>Cast your Vote Now!!!</h1>
            <h2> Your game code is {game_data['game_code']}. Use this code to join the game.</h2>
            <h3 id="game_question">{game_data['game_question']}</h3>
            <form onSubmit={castVote}>
                {render_choices()}
                <br />
            {render_vote_button()}
            </form>
        </div>
    );
}