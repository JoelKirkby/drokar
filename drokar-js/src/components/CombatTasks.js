import { Button } from "@mui/material";
import { MonsterData } from "../helpers/MonsterData";
import { useState, useContext } from "react";
import { PlayerDataContext } from "../helpers/Contexts";
import CombatFrame from "./CombatFrame";
import { rollAttackType } from "../functions/calcs";
import "./Combat.css";

const launchCombat = (activeCombat, setActiveCombat, playerData, setPlayerData, activeMonster, setActiveMonster, setAttackProg, setEnemyAttackProg, activeTask, setActiveTask, TICKRATE, setActiveAttack, setActiveEnemyAttack, refAttackProg, refEnemyAttackProg) => {
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


// const respawnMonster = (selectedMonster, setActiveMonster) => {
//     // Set current health values to max health
//     let combatStats = {...MonsterData[selectedMonster].combatStats,
//                     name: selectedMonster,
//                     currentHp: MonsterData[selectedMonster].combatStats.maxHp,
//                     currentMana: MonsterData[selectedMonster].combatStats.maxMana,
//                     currentFury: 0,
//                     maxFury: 100,
//                     }

//     let activeMonster = {...MonsterData[selectedMonster], combatStats: combatStats}
//     setActiveMonster(activeMonster)
//     launchCombat(false, setActiveCombat, playerData, setPlayerData, activeMonster, setActiveMonster, setAttackProg, setEnemyAttackProg, activeTask, setActiveTask)
//   }

function CombatTasks() { 
    const [selectedMonster, setSelectedMonster] = useState('')
    const {activeMonster, attackProg, setAttackProg, 
        enemyAttackProg, setEnemyAttackProg,
        playerData, setPlayerData, activeTask, setActiveTask,
        setActiveMonster, activeCombat, setActiveCombat,
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
    launchCombat(false, setActiveCombat, playerData, setPlayerData, activeMonster, setActiveMonster,  setAttackProg, setEnemyAttackProg, activeTask, setActiveTask, TICKRATE, setActiveAttack, setActiveEnemyAttack, refAttackProg, refEnemyAttackProg)
  }

    return (
        <div>
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
        <div className='flexContainer smallMargin'>
            <Button variant="contained" color="error" onClick={(e)=>{launchCombat(activeCombat, setActiveCombat, playerData, setPlayerData, activeMonster, setActiveMonster,  setAttackProg, setEnemyAttackProg, activeTask, setActiveTask, TICKRATE, setActiveAttack, setActiveEnemyAttack, refAttackProg, refEnemyAttackProg)}}>Fight!</Button>
        </div> 
        </div>
    )
    }
  
  export default CombatTasks;