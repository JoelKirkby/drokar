import { ItemData } from "../helpers/ItemData";
import InventoryItem from "./InventoryItem";
import { Slider, Button } from "@mui/material";
import TollIcon from '@mui/icons-material/Toll';
import { Security } from "@mui/icons-material";
import { PlayerDataContext } from "../helpers/Contexts";
import { useContext } from "react";
import './ItemInfoPanel.css'

const measureSlider = (event, setSellQuantity) => {
  setSellQuantity(event.target.value)
}

const statNames = {
  'meleeDamage': 'Melee Damage', 
  'armor': 'Melee Armor', 
  'rangedArmor': 'Ballistic Armor',
  'magicArmor': 'Magic Armor',
  'attackSpeed': 'Attack Speed', 
  'maxHp': 'Max HP', 
  'maxMana': 'Max Mana', 
  'maxFury': 'Max Fury',
  'blockChance': 'Block Chance',
  'blockAmount':'Block Amount'}

const sellItem = (itemName, sellQuantity, playerData, setPlayerData, setActiveItem) => {
  console.log(JSON.stringify(playerData))
  let newPlayerData = {...playerData}
  let unitPrice = ItemData[itemName].sellValue

  // Subtract quantity of item
  newPlayerData.inventory[itemName].quantity -= sellQuantity

  // Add gold based on value * quantity
  newPlayerData.gold += sellQuantity * unitPrice

  // Update player data
  setPlayerData(newPlayerData)
  if (newPlayerData.inventory[itemName].quantity == 0) {
    setActiveItem('')
  } 
}

const modifyStats = (itemData, newPlayerData, add) => {
  for (const [stat, value] of Object.entries(itemData.combatStats)) {
    if (stat == "attackSpeed") {
      newPlayerData.combatStats.attacks[0].speed = value
    } else {
      newPlayerData.combatStats[stat] += value * add
  }
  }
  return newPlayerData
}

const equipItem = (itemName, playerData, setPlayerData, setActiveItem) => {
  // TODO - Hardcode to only equip 1 of the items for now - will go back for equipping things with stack size eg. arrows
  let quantity = 1;
  let newPlayerData = {...playerData}
  let itemData = ItemData[itemName]
  let itemSlot = itemData.equip

  // Reduce inventory quantity, if zero then disable the item info panel
  newPlayerData.inventory[itemName].quantity -= quantity
  if (newPlayerData.inventory[itemName].quantity == 0) {
    setActiveItem('')
  }

  // Put equipped item back in inventory, subtract its stats
  var equippedItem = newPlayerData.equipped[itemSlot]
  if (newPlayerData.equipped[itemSlot]) {
    equippedItem in newPlayerData.inventory ? newPlayerData.inventory[equippedItem].quantity += 1
      : newPlayerData.inventory[equippedItem] = {"quantity": 1}
    // -1 argument to subtract
    newPlayerData = modifyStats(ItemData[equippedItem], newPlayerData, -1)
  } 

  // Add combat stats from equipped item
  if ("combatStats" in itemData) {
    newPlayerData = modifyStats(itemData, newPlayerData, 1)
  }
    newPlayerData.equipped[itemSlot] = itemName

    setPlayerData(newPlayerData)
}

// Item information panel which shows the item, description, sell value, and slider to sell
// TODO = Acquired and used by section, it's own tab?
function ItemInfoPanel({itemName, quantity, playerData, setPlayerData, setActiveItem}) {
  const {sellQuantity, setSellQuantity} = useContext(PlayerDataContext)
    return (
      <div className="itemInfoPanel">
        <div className="imageDescription">
          <div className="descriptionImageContainer">
            <InventoryItem itemName={itemName} quantity={quantity}/>
          </div>
          <div className="descriptionName">
            <p className="itemTitle"> {itemName} </p>
            <p className="itemDescription">{ItemData[itemName].description}</p>
          </div>
          </div>
        <div className="sellContainer">Sells for {ItemData[itemName].sellValue}gp each
          <Slider
            sx = {{width:'80%',}}
            size="small"
            defaultValue={1}
            value={sellQuantity}
            aria-label="Small"
            min = {1}
            max = {playerData.inventory[itemName].quantity}
            valueLabelDisplay="auto"
            onChange={(e) => measureSlider(e, setSellQuantity)} 
            />
          <p className='marginAuto'>Sell {sellQuantity} for {ItemData[itemName].sellValue * sellQuantity} gp?</p>
          <div style={{"display":"flex", 'gap': '6px'}}>
          <Button variant="contained" endIcon={<TollIcon/>} onClick={()=> sellItem(itemName, sellQuantity, playerData, setPlayerData, setActiveItem)}>
          Sell
          </Button>
          {"equip" in ItemData[itemName] ?
          <Button variant="contained" endIcon={<Security/>} sx={{backgroundColor:'orange'}} onClick={()=> equipItem(itemName, playerData, setPlayerData, setActiveItem)}> Equip </Button>
          : null
          }
          </div>
          {"equip" in ItemData[itemName] 
            ? <div className='combatStatList'>
                <p><b>Bonuses when equipped:</b></p>
                  {Object.entries(ItemData[itemName].combatStats).map(([stat, value]) => {
                    if (stat == "attackSpeed") {
                      value = (value / 1000).toFixed(2).toString() + " /s"
                    }
                    else if (value >0) 
                      {value = `+${value.toString()}`} 
                    return <p className="combatText">{statNames[stat]}: {value}</p>
                  })}
              </div>
            : null
          }
        </div>
      </div>
    );
  }
  
  export default ItemInfoPanel;