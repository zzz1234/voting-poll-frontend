export default function JoinPoll({handleJoinPollInputChange, handleJoinPollFormSubmit, joinPollFormData}) {
    // Function renders a small form asking for game_code and user_email and a submit button.
    // On submit, the function fetches the game_id from the game_code and the user_id from the user_email.

    // const [game_data, setGame_data] = useState({'game_question': '', 'game_code': ''});
    
    return (
        <div>
            <form onSubmit={handleJoinPollFormSubmit}>
                <label for="game_code">Game Code:</label>
                <input type="text" id="game_code" name="game_code" value={joinPollFormData.game_code} onChange={handleJoinPollInputChange}/><br /><br />
                <label for="user_email">Email:</label>
                <input type="text" id="user_email" name="user_email" value={joinPollFormData.user_email} onChange={handleJoinPollInputChange}/><br /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}