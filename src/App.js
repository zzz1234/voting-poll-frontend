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
      return <NewPollForm setGame_id={setGame_id} setPage={setPage} />;
    }
    else if (page === 'join') {
      return <JoinPoll setGame_id={setGame_id} setUser_id={setUser_id} setPage={setPage} />;
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
      <Footer />
    </div>
  );
}

export default App;