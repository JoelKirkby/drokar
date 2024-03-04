import '../App.css'
import { Box } from '@mui/material';
import { ProspectingTasks, MetallurgyTasks } from '../helpers/TaskData';
import { useContext, useEffect } from 'react';
import { PlayerDataContext } from '../helpers/Contexts';
import { ItemData } from '../helpers/ItemData';

const tasks = {
  Prospecting: ProspectingTasks,
  Metallurgy: MetallurgyTasks
      }



const skillLevel = 1

const runTask = (task, skill, playerData, setPlayerData) => {
  var load_task = tasks[skill].find((obj) => obj.name == task.name)
  let data = {...playerData};
  
  let i = 0;
  for (const [costItem, costAmount] of Object.entries(load_task.consumes)) {
     if (costItem in data.inventory && data.inventory[costItem].quantity >= costAmount) {
      data.inventory[costItem].quantity -= costAmount
     } else {
      return
     }
    i++
  }

  for (const [yieldItem, yieldAmount] of Object.entries(load_task.yields)) {
    yieldItem in data.inventory 
      ? data.inventory[yieldItem].quantity += yieldAmount
      : data.inventory[yieldItem] = {quantity: yieldAmount}
    i++
  }

  setPlayerData(data)
};
