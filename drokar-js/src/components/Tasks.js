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

const runTask = (load_task, skill, playerData, setPlayerData) => {
  
  let data = {...playerData};
  
  // Consume items required for task -  TODO this will bug if multiple items and one material is short. Return if insufficient
  for (const [costItem, costAmount] of Object.entries(load_task.consumes)) {
     if (costItem in data.inventory && data.inventory[costItem].quantity >= costAmount) {
      data.inventory[costItem].quantity -= costAmount
     } else {
      return
     }
  }

  // Generate items from the task
  for (const [yieldItem, yieldAmount] of Object.entries(load_task.yields)) {
    yieldItem in data.inventory 
      ? data.inventory[yieldItem].quantity += yieldAmount
      : data.inventory[yieldItem] = {quantity: yieldAmount}
  }

  // Gain experience
  data.skills[skill] += load_task.xpGain

  setPlayerData(data)
};

const Tasks = (props) => {
  const {playerData, setPlayerData, activeTask, setActiveTask} = useContext(PlayerDataContext)
  // TODO, this function gets loaded on every render. Ineffecient

  const launchTask = (task, skill, playerData, setPlayerData) => {
    clearInterval(activeTask.taskId)
    var newTask;

    var load_task = tasks[skill].find((obj) => obj.name == task.name)

    if (activeTask.name != task.name) {
      var intervalId = setInterval(runTask, task.duration, load_task, skill, playerData, setPlayerData)
      newTask = {...task,
      taskId: intervalId}
    }
    else {
      newTask = {}
    } 
    setActiveTask(newTask)
  }

    setActiveTask({
      name: name,
      taskId: intervalId
    })
  }
  
  var skill = props.skill
  return (
    <Box className="Tasks">
      {tasks[skill].map((task, key) => {
          return skillLevel >= task.levelRequirement ? 
            <div className="taskContainer" onClick={() => launchTask(task, skill, playerData, setPlayerData)}>
              <img src={task.image}></img>
              {`${task.name} - ${task.xpGain} XP`}
            </div>
          : null
        }
         )}
    </Box>
  );
}

export default Tasks;

