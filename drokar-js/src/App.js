import './App.css';
import Skills from  './components/Skills';
import Menu from  './components/Menu';
import Inventory from './components/Inventory';
import Events from './components/Events';

function App() {
  const loadPlayerData = useContext(PlayerDataContext)
  const [playerData, setPlayerData] = useState(loadPlayerData)
  let playerLevels = useMemo(() => calculateLevels(playerData, setPlayerData), [playerData])
  const [activeTask, setActiveTask] = useState({})     

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <PlayerDataContext.Provider value={{playerData, setPlayerData, activeTask, setActiveTask, playerLevels}}>
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
            <Events skill={activeSkill}/>
            <div className="combatContainer">
            <CombatFrame combatData={playerData.combatStats} name="You"/>
            {JSON.stringify(activeMonster) !== "{}" && <CombatFrame combatData={activeMonster} name={activeMonster.name}/>}
            </div>
          </Box>
        </Box>
      {/* </div> */}
    </PlayerDataContext.Provider>
    </Box>
  );
}

export default App;
