import './App.css';
import Skills from  './components/Skills';
import Menu from  './components/Menu';
import Inventory from './components/Inventory';
import Events from './components/Events';
const calculateLevels = ((playerData) => {
  var levels = {}
  for (const [skill, xp] of Object.entries(playerData.skills)) {
    let lvl = xpToLevel.findIndex((num) => num > xp)
    let progressToNextLvl = 100 * ((xp - xpToLevel[lvl-1]) / (xpToLevel[lvl] - xpToLevel[lvl-1]))
    levels[skill] = [lvl, progressToNextLvl]
  }
  console.log(`levels = ${JSON.stringify(levels)}`)
  return levels
  
})

function App() {
  // Declare active states for the app
  const [activeSkill, setActiveSkill] = useState("Prospecting")
  const loadPlayerData = useContext(PlayerDataContext)
  const [playerData, setPlayerData] = useState(loadPlayerData)
  let playerLevels = useMemo(() => calculateLevels(playerData), [playerData])
  const [activeTask, setActiveTask] = useState({})
  const [activeMonster, setActiveMonster] = useState({})
  console.log(`activeMonster2 = ${JSON.stringify(activeMonster)}`)


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <PlayerDataContext.Provider value={{playerData, setPlayerData, activeTask, setActiveTask, playerLevels, activeMonster, setActiveMonster}}>
        <Drawer variant="permanent" open={true} sx={{ position: 'relative' }}>
          <SideBar playerLevels={playerLevels} setActiveSkill={setActiveSkill}/>
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
