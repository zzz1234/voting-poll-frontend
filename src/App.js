import './App.css';

import ButtonGroup from './components/buttonGroup/ButtonGroup.js';
import Navbar from './components/navbar/Navbar.js';
import Footer from './components/footer/Footer.js';
import NewPollForm from './components/newPollForm/NewPollForm.js';
import ChoicesForm from './components/ChoicesForm/ChoicesForm.js';
import PollForm from './components/pollForm/pollForm.js';
import JoinPoll from './components/joinPoll/joinPoll.js';

import { useState } from "react";

function App() {

  // Create a state variable called page which is set to 'home' by default.
  const [page, setPage] = useState('home');
  const [game_id, setGame_id] = useState(null);
  const [user_id, setUser_id] = useState(null);

  const [joinPollFormData, setJoinPollFormData] = useState({
    // Initialize form data fields
    game_code: '',
    user_email: '',
  });

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
    const gameApiUrl = 'http://localhost:8000/api/game/game-code/' + joinPollFormData.game_code;
    const userApiUrl = 'http://localhost:8000/api/user/user-email/' + joinPollFormData.user_email;
    console.log(joinPollFormData);

    Promise.all([
      fetch(gameApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }),
      fetch(userApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    ]).then(async([gameRes, userRes]) => {
      const gameData = await gameRes.json();
      const userData = await userRes.json();
  
      setGame_id(gameData[0]['game_id']);
      setUser_id(userData[0]['user_id']); // Assuming you have a setUserId function to set user_id state variable

      console.log("Into the Poll Now!!");
      setPage('poll_form');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const [formData, setFormData] = useState({
    // Initialize form data fields
    game_name: '',
    no_of_votes: '',
    // Add more fields as needed
  });

  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
      e.preventDefault()
      const api_url = 'http://localhost:8000/api/create-game';
      console.log(formData);
      fetch(api_url, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
          'Content-Type': 'application/json'
          },
      }).then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          setResponse(data);
          setGame_id(data[0]['game_id']);
          console.log(data);
          alert("Poll created successfully!");
          setPage('add_choices');
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

  // Create a function handleClick which when clicked  redirects to the create or join page.
  const handleClick = (path) => {
    if (path === 'create') {
      setPage('create');
    }
    else if (path === 'join') {
      setPage('join');
    }
    else {
      setPage('home');
    }
  }

  // Create a function which renders the page based on the state variable.
  const renderPage = () => {
    if (page === 'create') {
      return <NewPollForm handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} formData={formData}/>;
    }
    else if (page === 'join') {
      return <JoinPoll handleJoinPollInputChange={handleJoinPollInputChange} handleJoinPollFormSubmit={handleJoinPollFormSubmit} joinPollFormData={joinPollFormData} />;
    }
    else if (page === 'add_choices') {
      return <ChoicesForm game_code={game_id} nextPageOnSubmit={setPage}/>;
    }
    else if (page === 'poll_form') {
      return <PollForm game_id={game_id} user_id={user_id}/>;
    }
    else {
      return <ButtonGroup onClick={handleClick}/>;
    }
  }

  return (
    <div className="App">
      <Navbar />
      {renderPage()}
      {/* <ChoicesForm/> */}
      <Footer />
    </div>
  );
}

export default App;