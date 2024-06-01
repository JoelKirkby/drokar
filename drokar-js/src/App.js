// styling
import './App.css';

// import libraries and components
import useSound from 'use-sound';
import whereIsHome from './helpers/sounds/Where_Is_Home.mp3';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';

import { Box } from '@mui/material';
import { useState, useContext, createContext, useMemo, useRef, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, IconButton, Slider, Stack } from '@mui/material';
import { useLayoutEffect } from 'react'
// My components
import Tasks from  './components/Tasks';
import Events from './components/Events';
import SideBar from './components/SideBar';
import Drawer from './components/Drawer';

import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from "@mui/material/CssBaseline";

// My data
import { PlayerDataContext } from './helpers/Contexts';
import { MonsterData } from './helpers/MonsterData';

const adjustSlider = (event, setFunc) => {
  let percent = event.target.value
  setFunc(percent)
}

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#14232D",
      paper: "#14232D"
    },
    mode: 'dark',
  },
});

function App() {
  // Game constants
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#14232D"
  });
 const TICKRATE = 40;

  // Game state hooks
  const [activeSkill, setActiveSkill] = useState("Prospecting") // active skill page player is viewing
  const loadPlayerData = useContext(PlayerDataContext) // Load player data from context

  const [playerData, setPlayerData] = useState(loadPlayerData) // Set player data as a state hook
  let playerLevels = useMemo(() => calculateLevels(playerData), [playerData]) // Calculate player levels based on player data
  const [activeTask, setActiveTask] = useState({}) // Active task the player is performing, eg. Combat or Prospecting
  const [activeMonster, setActiveMonster] = useState({}) // Monster that is loaded into the combat frame next to player frame
  const [activeVocation, setActiveVocation] = useState('')

  // Combat related hooks
  const [activeCombat, setActiveCombat] = useState(false) // Boolean true if combat is running
  const [sellQuantity, setSellQuantity] = useState(1) // Quantity of items to sell in equipment window
  const [activeAttack, setActiveAttack] = useState([]) // Player's active attack
  const [activeEnemyAttack, setActiveEnemyAttack] = useState([]) // Enemy's active attack
  const [attackProg, setAttackProg] = useState(0) // Attack progress for player
  const [enemyAttackProg, setEnemyAttackProg] = useState(0) // Attack progress for enemy
  const refAttackProg = useRef('') // Player previous attack progress to determine completed attack
  const refEnemyAttackProg = useRef('') // Enemy previous attack progress to determine completed attack
  const CombatDataContext = createContext({attackProg, setAttackProg, enemyAttackProg, setEnemyAttackProg, 
      activeCombat, setActiveCombat, activeMonster, setActiveMonster, playerData, setPlayerData, activeTask, setActiveTask, playerLevels, activeVocation, setActiveVocation, sellQuantity, setSellQuantity, activeAttack, setActiveAttack, activeEnemyAttack, setActiveEnemyAttack, refAttackProg, refEnemyAttackProg})


  const [musicVolume, setMusicVolume] = useState(50)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playMusic, {pause, duration}] = useSound(whereIsHome, {volume: musicVolume/100, loop: true, interrupt:false})

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      playMusic();
    }
    setIsPlaying(!isPlaying);
  }  
    
  return (
    <Box>
      <Stack spacing={0} direction="row" sx={{ mb: 1, width:"15%", height:"7px", marginLeft:"auto"}} alignItems="center">
          <a className="audioLabel">Music {isPlaying ? "On" : "Off"}</a>
          <IconButton variant="contained" color="primary" onClick={togglePlay}>{isPlaying ? <VolumeUpOutlinedIcon/> : <VolumeOffOutlinedIcon/>}</IconButton>
          <Slider
            sx = {{width:'50%', height: '3px'}}
            size="small"
            value={musicVolume}
            aria-label="Small"
            onChange={(e) => adjustSlider(e, setMusicVolume, false)} 
            />
      </Stack>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <PlayerDataContext.Provider value={{playerData, setPlayerData, activeTask, setActiveTask, 
            playerLevels, activeMonster, setActiveMonster, attackProg, enemyAttackProg, setAttackProg, 
            setEnemyAttackProg, activeCombat, setActiveCombat, activeVocation, setActiveVocation, 
            sellQuantity, setSellQuantity, TICKRATE, activeAttack, setActiveAttack, activeEnemyAttack, setActiveEnemyAttack, refAttackProg, refEnemyAttackProg}}>
          <ThemeProvider theme={darkTheme}>
          <Drawer variant="permanent" open={true} sx={{ position: 'relative' }}>
            <SideBar playerLevels={playerLevels} setActiveSkill={setActiveSkill}/>
          </Drawer>
          </ThemeProvider>
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
            {/* TODO - set the activeTask to bank and skill tree and link to those components . Eventually should clean up and do the routing here rather than in Tasks.js */}
            <Tasks skill={activeSkill}/>
          </Box>
          <Box className="row2">
            <Events skill={activeSkill}/>
          </Box>
       
          </Box>
        </PlayerDataContext.Provider>
      </Box>
    </Box>
      );
    }

export default App;
