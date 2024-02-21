import './App.css';
import Skills from  './components/Skills';
import Menu from  './components/Menu';
import Inventory from './components/Inventory';
import Events from './components/Events';

function App() {
  return (
    <div className="App">
      <Skills/>
      <Menu/>
      <Inventory/>
      <Events/>
    </div>
  );
}

export default App;
