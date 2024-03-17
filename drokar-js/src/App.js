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

function roll(probabilities) {
  // Roll an outcome based on input probabilities O[n]
  const totalProbability = probabilities.reduce((sum, probability) => sum + probability, 0);
  const randomValue = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    if (randomValue < cumulativeProbability) {
      return i;
    }
  }

  return probabilities.length - 1;
}
function App() {
  // Declare active states for the app
  const [activeSkill, setActiveSkill] = useState("Prospecting")
  const loadPlayerData = useContext(PlayerDataContext)
  const [playerData, setPlayerData] = useState(loadPlayerData)
  let playerLevels = useMemo(() => calculateLevels(playerData), [playerData])
  const [activeTask, setActiveTask] = useState({})
  const [activeMonster, setActiveMonster] = useState({})
  const tickRate = 40;
  const [attackProg, setAttackProg] = useState(0)
  const [enemyAttackProg, setEnemyAttackProg] = useState(0)
  const [activeCombat, setActiveCombat] = useState(false)
  const refAttackProg = useRef('')
  const refEnemyAttackProg = useRef('')
  useEffect(() => {
      // If attack progress is completed, and combat is active, attack the monster
      if ((refAttackProg.current > attackProg) && activeCombat) {
          console.log("Attacking")
          let newPlayerData = {...playerData}
          let newMonsterData = {...activeMonster}

          newMonsterData.currentHp -= Math.max(( playerData.combatStats.damage - newMonsterData.armor ), 0)
          newPlayerData.combatStats.currentFury += 1
          // Proof of concept - kickback. Will implement this for magic attacks to delay casting.
          // setEnemyAttackProg(prev => Math.max(prev-35, 0))
          if (newMonsterData.currentHp <= 0) {
            console.log("Monster Dead")
            setActiveMonster({})
            clearInterval(activeCombat)
            setActiveCombat(false)
          } 
          setPlayerData(newPlayerData)
          setActiveMonster(newMonsterData)
          
      }

      // If enemy attack progress is completed, and combat is active, attack the player
      if ((refEnemyAttackProg.current > enemyAttackProg) && activeCombat) {
          console.log("Enemy Attacking")
          let newPlayerData = {...playerData}
          let newMonsterData = {...activeMonster}
          newPlayerData.combatStats.currentHp -= Math.max((activeMonster.damage - newPlayerData.combatStats.armor), 0)
          newMonsterData.currentFury +=3
          console.log(Date.now())
          setActiveMonster(newMonsterData)
          setPlayerData(newPlayerData)
      }
      
      // Cache previous attack progress values, if the new value is lower then the attack charge has been completed
      refAttackProg.current = attackProg
      refEnemyAttackProg.current = enemyAttackProg

      }, [attackProg, enemyAttackProg])

  const launchCombat = (activeCombat, setActiveCombat) => {
    // Calculate per tick progression based on attackSpeed and tickRate
    const prog = 100 / (playerData.combatStats.attackSpeed / tickRate)
    const enemyProg = 100 / (activeMonster.attackSpeed / tickRate)
    
    if (!activeCombat) {
      const timer = setInterval(() => {
          setAttackProg(prev => (prev + prog)% 100)
          setEnemyAttackProg(prev => (prev + enemyProg)% 100)
          }, tickRate)
      setActiveCombat(timer)
    }
    else {
      // Stop combat, clear the loop, revert attack progress to 0
      clearInterval(activeCombat)
      setAttackProg(0)
      setEnemyAttackProg(0)
      setActiveCombat(false)
    }
    }
  console.log(`Checking activeMonster`)

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
            <CombatFrame playerData={playerData} setFunc={setPlayerData} name="You"/>
            {JSON.stringify(activeMonster) !== "{}" && <CombatFrame combatData={activeMonster} name={activeMonster.name}/>}
            </div>
          </Box>
        </Box>
    </PlayerDataContext.Provider>
    </Box>
  );
}

export default App;
