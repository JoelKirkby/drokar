// styling
import './App.css';

// import libraries and components
import { styled } from '@mui/material/styles'
import {Box } from '@mui/material';
import { useState, useContext, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';

// My components
import Tasks from  './components/Tasks';
import Inventory from './components/Inventory';
import Events from './components/Events';
import SideBar from './components/SideBar';
import CombatFrame from './components/CombatFrame';

// My data
import { xpToLevel } from './helpers/gameData';
import { PlayerDataContext } from './helpers/Contexts';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

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
