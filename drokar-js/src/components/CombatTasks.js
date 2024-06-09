import { Button } from "@mui/material";
import { MonsterData } from "../helpers/MonsterData";
import { useState, useContext, useEffect } from "react";
import { PlayerDataContext } from "../helpers/Contexts";
import CombatFrame from "./CombatFrame";
import { rollAttackType, rollLootTable } from "../functions/calcs";
import "./Combat.css";

const applyEffects = (friendlyData, enemyData, setEnemyAttackProg, effect) => {
  // Roll to see if the effect is applied
  let success = roll_one(effect.applyEffectChance)
  // Determine target of effect
  let target = effect.applyEffectTarget === "enemy" ? enemyData : friendlyData

  // Apply effect
  if (success) {
    if (effect.applyEffect === "manaDrain") {
      target.combatStats.currentMana = Math.max(target.combatStats.currentMana - effect.applyEffectAmount, 0)
      friendlyData.combatStats.currentMana = friendlyData.combatStats.currentMana + effect.applyEffectAmount
    }
    else if (effect.applyEffect === "pushback") {
      let percent = (effect.applyStatusAmount / target.combatStats.attackSpeed) * 100
      setEnemyAttackProg(prev => Math.max(prev-percent, 0))
    }
  }
    

}
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
        setAttackProg(prev => (prev + prog))
        setEnemyAttackProg(prev => (prev + enemyProg))
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




function CombatTasks() { 
  const [selectedMonster, setSelectedMonster] = useState('')
  const {activeMonster, attackProg, setAttackProg, 
      enemyAttackProg, setEnemyAttackProg,
      playerData, setPlayerData, activeTask, setActiveTask,
      setActiveMonster, activeCombat, setActiveCombat,
      activeAttack, activeEnemyAttack, setActiveAttack, setActiveEnemyAttack, TICKRATE, refAttackProg, refEnemyAttackProg} = useContext(PlayerDataContext)


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
    launchCombat(false, setActiveCombat, playerData, setPlayerData, activeMonster, setActiveMonster,  
      setAttackProg, setEnemyAttackProg, activeTask, setActiveTask, TICKRATE, setActiveAttack, 
      setActiveEnemyAttack, refAttackProg, refEnemyAttackProg)
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