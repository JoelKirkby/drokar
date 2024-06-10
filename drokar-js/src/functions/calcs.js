
import { xpToLevel } from '../helpers/gameData';

// Functions for calculating various game mechanics

export function calculateColor(percent) {
  // Calculate colour of health bar based on percentage
  // value from 0 to 100
  var hue=(percent*1.2).toString(10);
  return ["hsl(",hue,",90%,40%)"].join("");

}

export function calculateLevels(playerData) {
    // Calculate levels based on cumulative XP
    // args: 
    //      playerData(object): Player data, !TODO: levels for monsters
    // returns:
    //      levels(object): Skill levels and progress to next level

    var levels = {}
    for (const [skill, xp] of Object.entries(playerData.skills)) {
      let lvl = xpToLevel.findIndex((num) => num > xp)
      let progressToNextLvl = 100 * ((xp - xpToLevel[lvl-1]) / (xpToLevel[lvl] - xpToLevel[lvl-1]))
      levels[skill] = [lvl, progressToNextLvl]
    }
    return levels
    
  }

  export function roll_one(probability) {
    // Roll a single probability
    let probabilities = [Math.max(1 - probability, 0), Math.min(probability, 1)]
    
    return roll(probabilities)
  }
  
export function roll(probabilities) {
    // Roll an outcome based on input probabilities O[n]
    // args: 
    //  probabilities(list[float..]): list of probabilities each between 0 and 1
    // returns:
    //      outcome(int) : index of the probability that was rolled

    const totalProbability = probabilities.reduce((sum, probability) => sum + probability, 0);
    const randomValue = Math.random() * totalProbability;
    let cumulativeProbability = 0;
  
    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProbability += probabilities[i];
      if (randomValue < cumulativeProbability) {
        return i;
      }
    }
    
    let outcome = probabilities.length - 1
    return outcome;
  }
  
export function rollLootTable(rates, drops){
  // Rolls drops from loot table
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

export function getAttackChance(entityData) {
  // Update entityData's "attack" chance
  let attackProbs = entityData.combatStats.attacks.map(a => a.chance ?? 0)
  
  // Basic attack probability is 1 - sum of all other attack probabilities
  entityData.combatStats.attacks[0].chance = 1 - attackProbs.slice(1).reduce((a, b) => a + b, 0)
}
  
export function rollAttackType(entityData) {
    // Roll for attack type based on entity's attack chances
    // args: 
    //      entityData(object): entity data
    // returns:
    //      entityData(object): modified entity data with a selected attack type and new attack speed        
    
    let attackProbs = entityData.combatStats.attacks.map(a => a.chance ?? 0)
    let rolledAttack
    // Roll for fury attack if fury is full
    if (entityData.combatStats.currentFury >= entityData.combatStats.maxFury) {
    
    attackProbs = entityData.combatStats.furyAttackChances
    rolledAttack = entityData.combatStats.furyAttacks[roll(attackProbs)]
    }
    else {rolledAttack = entityData.combatStats.attacks[roll(attackProbs)]
    }
    entityData.combatStats.selectedAttack = rolledAttack.name
    entityData.combatStats.attackSpeed = rolledAttack.speed
    
    return entityData
}
  