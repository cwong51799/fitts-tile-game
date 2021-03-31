import './css/App.css';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import Header from './components/Header'
import FittsDisplay from './components/FittsDisplay';

function App() {
  return (
    <div className="full-container">
      <div className="primary-container">
        <Header/>
        <Board/>
        <Scoreboard/>
      </div>
      <div className="fitts-display">
        <FittsDisplay/>
      </div>
    </div>
  );
}

export default App;
