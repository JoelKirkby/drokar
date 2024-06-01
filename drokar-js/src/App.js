// styling
import './App.css';

// import libraries and components
import useSound from 'use-sound';
import whereIsHome from './helpers/sounds/Where_Is_Home.mp3';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';

import { Box } from '@mui/material';
import { useState, useContext, useMemo, useRef, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, IconButton, Slider, Stack } from '@mui/material';
import { useLayoutEffect } from 'react'
// My components
import Tasks from  './components/Tasks';
import Events from './components/Events';
import SideBar from './components/SideBar';
import Drawer from './components/Drawer';
import CombatFrame from './components/CombatFrame';
import {calculateLevels, rollLootTable, rollAttackType} from './functions/calcs.js';

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

  // App Hooks
 const respawnMonster = (selectedMonster, setActiveMonster) => {
    // Set current health values to max health
    let combatStats = {...MonsterData[selectedMonster].combatStats,
                    name: selectedMonster,
                    currentHp: MonsterData[selectedMonster].combatStats.maxHp,
                    currentMana: MonsterData[selectedMonster].combatStats.maxMana,
                    currentFury: 0,
                    maxFury: 100,
                    }

    let activeMonster = {...MonsterData[selectedMonster], combatStats: combatStats}
    setActiveMonster(activeMonster)
    launchCombat(false, setActiveCombat, playerData, setPlayerData, activeMonster, setActiveMonster, setAttackProg, setEnemyAttackProg, activeTask, setActiveTask)
  }


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
  
  // Manage combat events for each game tick
  useEffect(() => {
    let newPlayerData = {...playerData}
    let newMonsterData = {...activeMonster}

    // If attack progress is completed, and combat is active, attack the monster
    if ((refAttackProg.current > attackProg) && activeCombat) {
        // Get attack data whether it's a fury attack or not
        let attackData, attackType
        if (newPlayerData.combatStats.currentFury == newPlayerData.combatStats.maxFury) {
          attackData = newPlayerData.combatStats.furyAttacks.find((obj) => obj.name == newPlayerData.combatStats.selectedAttack)
          newPlayerData.combatStats.currentFury = 0
        }
        else {
          attackData = newPlayerData.combatStats.attacks.find((obj) => obj.name == newPlayerData.combatStats.selectedAttack)
          newPlayerData.combatStats.currentFury = Math.min(100, newPlayerData.combatStats.currentFury + newPlayerData.combatStats.furyRate)
        }

        attackType = attackData.type
        let damageCalculation = newPlayerData.combatStats[`${attackType}Damage`] + attackData.damage - newMonsterData.combatStats[`${attackType}Armor`] 
        let calculatedDamage = Math.max(damageCalculation, 0)
        newMonsterData.combatStats.currentHp -= calculatedDamage
        
        
        newPlayerData = rollAttackType(newPlayerData)
        // let newAttackData = newPlayerData.combatStats.attacks.find((obj) => obj.name == newPlayerData.combatStats.selectedAttack)

        // TODO - Kickback from attack, heavy weaponry can kick back attack charges
        // setActiveAttack(newPlayerData.combatStats.selectedAttack)
        // setEnemyAttackProg(prev => Math.max(prev-35, 0))
        let death = false
        if (newMonsterData.combatStats.currentHp <= 0) {
          death = true
          const [drop, quantity] = rollLootTable(activeMonster.dropRates, activeMonster.drops)
          if (drop) {
            console.log(`Loot found! ${drop}`)
            drop in newPlayerData.inventory 
            ? newPlayerData.inventory[drop].quantity += 1
            : newPlayerData.inventory[drop] = {"quantity": 1}
          }
          setActiveMonster({})
          setTimeout(() => {respawnMonster(newMonsterData.combatStats.name, setActiveMonster)}, 2000)
          clearInterval(activeCombat)
          setActiveCombat(false)
        } 
        setActiveAttack([newPlayerData.combatStats.selectedAttack, newPlayerData.combatStats.attackSpeed])
        setPlayerData(newPlayerData)
        setActiveMonster(newMonsterData)
        }
        
    
    // If enemy attack progress is completed, and combat is active, attack the player
    if ((refEnemyAttackProg.current > enemyAttackProg) && activeCombat) {
        let newPlayerData = {...playerData}
        let newMonsterData = {...activeMonster}

        
        // Get attack data whether it's a fury attack or not
        let attackData, attackType
        if (newMonsterData.combatStats.currentFury == newMonsterData.combatStats.maxFury) {
          attackData = newMonsterData.combatStats.furyAttacks.find((obj) => obj.name == newMonsterData.combatStats.selectedAttack)
          newMonsterData.combatStats.currentFury = 0
          
        }
        else {
          attackData = newMonsterData.combatStats.attacks.find((obj) => obj.name == newMonsterData.combatStats.selectedAttack)
          newMonsterData.combatStats.currentFury = Math.min(100, newMonsterData.combatStats.currentFury + newMonsterData.combatStats.furyRate)
        }
        attackType = attackData.type

        let damageCalculation = newMonsterData.combatStats[`${attackType}Damage`] + attackData.damage - newPlayerData.combatStats[`${attackType}Armor`]
        let calculatedDamage = Math.max(damageCalculation, 0)
      
        newPlayerData.combatStats.currentHp -= Math.max(calculatedDamage, 0)

        newMonsterData = rollAttackType(newMonsterData)

        if (newPlayerData.combatStats.currentHp <= 0) {
          console.log("Player Dead")

          setActiveMonster({})
          clearInterval(activeCombat)
          setActiveCombat(false)
        } 

        setActiveEnemyAttack([newMonsterData.combatStats.selectedAttack, newMonsterData.combatStats.attackSpeed])
        setActiveMonster(newMonsterData)
        setPlayerData(newPlayerData)
    }

      // Cache previous attack progress values, if the new value is lower then the attack charge has been completed
      refAttackProg.current = attackProg
      refEnemyAttackProg.current = enemyAttackProg

      }, [attackProg, enemyAttackProg])

  const launchCombat = (activeCombat, setActiveCombat, playerData, setPlayerData, activeMonster, setActiveMonster, setAttackProg, setEnemyAttackProg, activeTask, setActiveTask) => {
    // Calculate per tick progression based on attackSpeed and TICKRATE

    // Clear running Prospecting or Metallurgy task if it exists
    clearInterval(activeTask.taskId)
    setActiveTask({})

    // Roll the type of attack to be made
    playerData = rollAttackType(playerData)
    activeMonster = rollAttackType(activeMonster)
    
    // Reset attack progress
    setAttackProg(0)
    setEnemyAttackProg(0)
    refAttackProg.current = 0
    refEnemyAttackProg.current = 0

    // Calculate attack progression per tick
    let prog = 100 / (playerData.combatStats.attackSpeed / TICKRATE)
    let enemyProg = 100 / (activeMonster.combatStats.attackSpeed / TICKRATE)
    

    // If combat is not active, start the combat loop and set states
    if (!activeCombat) {
      // Set the combat loop
      const timer = setInterval(() => {
          prog = 100 / (playerData.combatStats.attackSpeed / TICKRATE)
          enemyProg = 100 / (activeMonster.combatStats.attackSpeed / TICKRATE) 
          setAttackProg(prev => (prev + prog)% 100)
          setEnemyAttackProg(prev => (prev + enemyProg)% 100)
          }, TICKRATE)
      setActiveAttack([playerData.combatStats.selectedAttack, playerData.combatStats.attackSpeed])
      setActiveEnemyAttack([activeMonster.combatStats.selectedAttack, activeMonster.combatStats.attackSpeed])
      setPlayerData(playerData)
      setActiveMonster(activeMonster)
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
        <PlayerDataContext.Provider value={{playerData, setPlayerData, activeTask, setActiveTask, playerLevels, activeMonster, setActiveMonster, setAttackProg, setEnemyAttackProg, activeCombat, setActiveCombat, activeVocation, setActiveVocation, sellQuantity, setSellQuantity}}>
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
            <div className="combatContainer">
            <CombatFrame combatData={playerData.combatStats} name="You" attackProg={attackProg} activeAttack={activeAttack} />
            {(JSON.stringify(activeMonster) !== "{}" && activeMonster.combatStats.currentHp >= 0) 
                && <CombatFrame 
                  combatData={activeMonster.combatStats} 
                  name={activeMonster.name} 
                  attackProg={enemyAttackProg}
                  activeAttack={activeEnemyAttack}/>
            }
            </div>
          </Box>
            <div className='flexContainer smallMargin'>
              <Button variant="contained" color="error" onClick={(e)=>{launchCombat(activeCombat, setActiveCombat, playerData, setPlayerData, activeMonster, setActiveMonster,  setAttackProg, setEnemyAttackProg, activeTask, setActiveTask)}}>Fight!</Button>
            </div>        
          </Box>
        </PlayerDataContext.Provider>
      </Box>
    </Box>
      );
    }
// =======

//   return (
//     <Box>
//         <Stack spacing={0} direction="row" sx={{ mb: 1, width:"15%", height:"7px", marginLeft:"auto"}} alignItems="center">
//             <a className="audioLabel">Music {isPlaying ? "On" : "Off"}</a>
//             <IconButton variant="contained" color="primary" onClick={togglePlay}>{isPlaying ? <VolumeUpOutlinedIcon/> : <VolumeOffOutlinedIcon/>}</IconButton>
//             <Slider
//               sx = {{width:'50%', height: '3px'}}
//               size="small"
//               value={musicVolume}
//               aria-label="Small"
//               onChange={(e) => adjustSlider(e, setMusicVolume, false)} 
//               />
//         </Stack>
//       <Box sx={{display: 'flex'}}>
//         <CssBaseline />
//         <PlayerDataContext.Provider value={{playerData, setPlayerData, activeTask, setActiveTask, playerLevels, activeMonster, setActiveMonster, activeCombat, setActiveCombat, sellQuantity, setSellQuantity}}>
//         <SideBar playerLevels={playerLevels} setActiveSkill={setActiveSkill}/>
//           <Box
//               component="main"
//               sx={{
//                 backgroundColor: (theme) =>
//                   theme.palette.mode === 'light'
//                     ? theme.palette.grey[100]
//                     : theme.palette.grey[900],
//                 flexGrow: 1,
//                 height: '100vh',
//                 overflow: 'auto',
//               }}
//             >

//             <Box className='row1'>
//               <Tasks skill={activeSkill}/>
//               <Inventory/>
//             </Box>
//             <Box className="row2">
//               <Events skill={activeSkill}/>
//               <div className="combatContainer">
//               <CombatFrame combatData={playerData.combatStats} name="You" attackProg={attackProg} activeAttack={activeAttack} />
//               {(JSON.stringify(activeMonster) !== "{}" && activeMonster.combatStats.currentHp >= 0) 
//                 && <CombatFrame 
//                   combatData={activeMonster.combatStats} 
//                   name={activeMonster.name} 
//                   attackProg={enemyAttackProg}
//                   activeAttack={activeEnemyAttack}/>
//               }
//               </div>
//             </Box>
//             <div className='flexContainer smallMargin'>
//               <Button variant="contained" color="error" onClick={(e)=>{launchCombat(activeCombat, setActiveCombat, playerData, setPlayerData, activeMonster, setActiveMonster,  setAttackProg, setEnemyAttackProg, activeTask, setActiveTask)}}>Fight!</Button>
//             </div>
//           </Box>
//       </PlayerDataContext.Provider>
//       </Box>
// >>>>>>> master
    // </Box>


export default App;
