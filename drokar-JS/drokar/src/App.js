import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button'
import SaveIcon from '@mui/icons-material/Save'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button
        variant="contained"
        startIcon={<SaveIcon />} 
        color='primary'>
          Noob
        </Button> 
        <Button variant="outlined" size="small" startIcon={<SaveIcon />}>
  Delete
</Button>
<Button variant="contained" endIcon={<SaveIcon />}>
  Send
</Button>
        <img src={logo} className="App-logo" alt="logo" />
          Learn React

      </header>
    </div>
  );
}

export default App;
