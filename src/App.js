import './App.css';

import ButtonGroup from './components/buttonGroup/ButtonGroup.js';
import Navbar from './components/navbar/Navbar.js';
import Footer from './components/footer/Footer.js';
import NewPollForm from './components/newPollForm/NewPollForm.js';
import ChoicesForm from './components/ChoicesForm/ChoicesForm.js';
import PollForm from './components/pollForm/pollForm.js';
import JoinPoll from './components/joinPoll/joinPoll.js';
import BackButton from './components/backButton/backButton.js';
import ResultsForm from './components/resultsForm/resultsForm.js';
import ResultsPieChart from './components/resultsPieChart/resultsPieChart.js';

import { useState } from "react";

function App() {

  // Create a state variable called page which is set to 'home' by default.
  const [page, setPage] = useState('home');
  const [game_id, setGame_id] = useState(null);
  const [user_id, setUser_id] = useState(null);
  const [historyStack, setHistoryStack] = useState(['home']);

  // Create a function handleClick which when clicked  redirects to the create or join page.
  const handleClick = (path) => {
    if (path === 'create') {
      setPageWithHistory('create');
    }
    else if (path === 'join') {
      setPageWithHistory('join');
    }
    else if (path === 'results') {
      setPageWithHistory('results');
    }
    else if (path === 'results_page') {
      setPageWithHistory('results_page');
    }
    else {
      setPageWithHistory('home');
    }
  }

  const setPageWithHistory = (page) => {
    setPage(page);
    setHistoryStack([...historyStack, page]);
    console.log(historyStack);
  }

  // Create a function which renders the page based on the state variable.
  const renderPage = () => {
    if (page === 'create') {
      return <NewPollForm setGame_id={setGame_id} setPage={setPageWithHistory} />;
    }
    else if (page === 'join') {
      return <JoinPoll setGame_id={setGame_id} setUser_id={setUser_id} setPage={setPageWithHistory} />;
    }
    else if (page === 'add_choices') {
      return <ChoicesForm game_code={game_id} nextPageOnSubmit={setPageWithHistory}/>;
    }
    else if (page === 'poll_form') {
      return <PollForm game_id={game_id} user_id={user_id}/>;
    }
    else if (page === 'results') {
      return <ResultsForm setGame_id={setGame_id} nextPageOnSubmit={setPageWithHistory}/>
    }
    else if (page === 'results_page') {
      return <ResultsPieChart game_id={game_id}/>
    }
    else {
      return <ButtonGroup onClick={handleClick}/>;
    }
  }

  const renderBackButton = () => {
    if (historyStack.length > 1) {
      return <BackButton historyStack={historyStack} setHistoryStack={setHistoryStack} setPage={setPage} />;
    }
  }

  return (
    <div className="App">
      <Navbar />
      {renderPage()}
      {renderBackButton()}
      <Footer />
    </div>
  );
}

export default App;