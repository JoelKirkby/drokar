import './App.css';
import Skills from  './components/Skills';
import Menu from  './components/Menu';
import Inventory from './components/Inventory';
import Events from './components/Events';

function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <PlayerDataContext.Provider value={{playerData, setPlayerData, activeTask, setActiveTask}}>
        <Drawer variant="permanent" open={true} sx={{ position: 'relative' }}>
          {list('left')}
        </Drawer>

        <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
          <Box className='row1'>
            <Tasks skill={activeSkill}/>
            <Inventory/>
          </Box>
          <Box className="row2">
            <Events/>
          </Box>
        </Box>
      {/* </div> */}
    </PlayerDataContext.Provider>
    </Box>
  );
}

export default App;
