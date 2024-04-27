// styling
import './App.css';

// import libraries and components
import { styled } from '@mui/material/styles'
import {Box } from '@mui/material';
import { useState, useContext, useMemo, useRef, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import { Drawer, Button } from '@mui/material';

// My components
import Tasks from  './components/Tasks';
import Inventory from './components/Inventory';
import Events from './components/Events';
import SideBar from './components/SideBar';
import CombatFrame from './components/CombatFrame';

// My data
import { PlayerDataContext } from './helpers/Contexts';


const calculateLevels = ((playerData) => {
  var levels = {}
  for (const [skill, xp] of Object.entries(playerData.skills)) {
    let lvl = xpToLevel.findIndex((num) => num > xp)
    let progressToNextLvl = 100 * ((xp - xpToLevel[lvl-1]) / (xpToLevel[lvl] - xpToLevel[lvl-1]))
    levels[skill] = [lvl, progressToNextLvl]
  }
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
const rollLootTable = (rates, drops) => {
  let dropRates = [...rates]
  let noLootProb = 1 - dropRates.reduce((a, b) => a + b, 0)
  dropRates.push(noLootProb)
  let lootRoll = roll(dropRates)

  if (lootRoll === (dropRates.length -1)) {
    return ['', 0]
  }
  else {
    return [drops[lootRoll], 1]
  }
}
  const rollAttackType = (entityData) => {
    let attackProbs = entityData.combatStats.attackChances
    let rolledAttack
    // Roll for fury attack if fury is full
    if (entityData.combatStats.currentFury >= entityData.combatStats.maxFury) {
      
      attackProbs = entityData.combatStats.furyAttackChances
      rolledAttack = entityData.combatStats.furyAttacks[roll(attackProbs)]
      console.log("FURY ATTACK")
      console.log('rolledAttack.name = ' + rolledAttack.name)
    }
    else {rolledAttack = entityData.combatStats.attacks[roll(attackProbs)]
    }
    entityData.combatStats.selectedAttack = rolledAttack.name
    entityData.combatStats.attackSpeed = rolledAttack.speed
    
    return entityData
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
  const [sellQuantity, setSellQuantity] = useState(1)

  const [activeAttack, setActiveAttack] = useState([])
  const [activeEnemyAttack, setActiveEnemyAttack] = useState([])
  const refAttackProg = useRef('')
  const refEnemyAttackProg = useRef('')
  useEffect(() => {
    let newPlayerData = {...playerData}
    let newMonsterData = {...activeMonster}
    // If attack progress is completed, and combat is active, attack the monster
    if ((refAttackProg.current > attackProg) && activeCombat) {
        console.log("Attacking")
        // console.log(`newPlayerData = ${JSON.stringify(newPlayerData)}`)
        
        // Get attack data whether it's a fury attack or not
        let attackData, attackType
        if (newPlayerData.combatStats.currentFury == newPlayerData.combatStats.maxFury) {
          console.log(`Tick`)
          attackData = newPlayerData.combatStats.furyAttacks.find((obj) => obj.name == newPlayerData.combatStats.selectedAttack)
          console.log('Tack')
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
        // console.log(`newPlayerData = ${JSON.stringify(newPlayerData)}`)
        // setActiveAttack(newPlayerData.combatStats.selectedAttack)
        // setEnemyAttackProg(prev => Math.max(prev-35, 0))
        let death = false
        if (newMonsterData.combatStats.currentHp <= 0) {
          console.log("Monster Dead")
          death = true
          const [drop, quantity] = rollLootTable(activeMonster.dropRates, activeMonster.drops)
          if (drop) {
            console.log(`Loot found! ${drop}`)
            drop in newPlayerData.inventory 
            ? newPlayerData.inventory[drop].quantity += 1
            : newPlayerData.inventory[drop] = {"quantity": 1}
          }
          setActiveMonster({})
          clearInterval(activeCombat)
          setActiveCombat(false)
        } 
        setActiveAttack([newPlayerData.combatStats.selectedAttack, newPlayerData.combatStats.attackSpeed])
        setPlayerData(newPlayerData)
        setActiveMonster(newMonsterData)
        }
        
    
      // If enemy attack progress is completed, and combat is active, attack the player
    if ((refEnemyAttackProg.current > enemyAttackProg) && activeCombat) {
        console.log("Enemy Attacking")
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
    // Calculate per tick progression based on attackSpeed and tickRate

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
    let prog = 100 / (playerData.combatStats.attackSpeed / tickRate)
    let enemyProg = 100 / (activeMonster.combatStats.attackSpeed / tickRate)
    

    // If combat is not active, start the combat loop and set states
    if (!activeCombat) {
      const timer = setInterval(() => {
          prog = 100 / (playerData.combatStats.attackSpeed / tickRate)
          enemyProg = 100 / (activeMonster.combatStats.attackSpeed / tickRate) 
          setAttackProg(prev => (prev + prog)% 100)
          setEnemyAttackProg(prev => (prev + enemyProg)% 100)
          }, tickRate)
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
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <PlayerDataContext.Provider value={{playerData, setPlayerData, activeTask, setActiveTask, playerLevels, activeMonster, setActiveMonster, activeCombat, setActiveCombat, sellQuantity, setSellQuantity}}>
      <SideBar playerLevels={playerLevels} setActiveSkill={setActiveSkill}/>
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
  );
}

export default App;
