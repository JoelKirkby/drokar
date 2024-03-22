import { ItemData } from "../helpers/ItemData";
import InventoryItem from "./InventoryItem";
import { Slider, Button } from "@mui/material";
import TollIcon from '@mui/icons-material/Toll';
import { useState } from "react";
import './ItemInfoPanel.css'

const measureSlider = (event, setSellQuantity) => {
  console.log(`Slider value = ${event.target.value}`)
  setSellQuantity(event.target.value)
}

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
    const [sellQuantity, setSellQuantity] = useState(1)
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
        <div>Sells for {ItemData[itemName].sellValue}gp each
          <Slider
            sx = {{width:'80%',}}
            size="small"
            defaultValue={1}
            aria-label="Small"
            min = {1}
            max = {quantity}
            valueLabelDisplay="auto"
            onChange={(e) => measureSlider(e, setSellQuantity)} 
            />
          <div style={{"display":"flex"}}>
          <Button variant="contained" endIcon={<TollIcon/>} onClick={()=> sellItem(itemName, sellQuantity, playerData, setPlayerData, setActiveItem)}>
          Sell
          </Button>
          {"equip" in ItemData[itemName] ?
          <Button variant="contained" endIcon={<TollIcon/>} sx={{backgroundColor:'orange'}} onClick={()=> equipItem(itemName, playerData, setPlayerData, setActiveItem)}> Equip </Button>
          : null
          }
          </div>
          <br></br>
          Sell {sellQuantity} for {ItemData[itemName].sellValue * sellQuantity} gp?
        </div>
      </div>
    );
  }
  
  export default ItemInfoPanel;