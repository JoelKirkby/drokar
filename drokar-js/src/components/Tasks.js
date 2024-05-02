import '../App.css'
import { Box } from '@mui/material';
import { ProspectingTasks, MetallurgyTasks} from '../helpers/TaskData';
import { useContext} from 'react';
import { PlayerDataContext } from '../helpers/Contexts';
import CombatTasks from './CombatTasks';
import AbilityWindow from './AbilityWindow';
import ItemWindow from './ItemWindow';

const tasks = {
  Prospecting: ProspectingTasks,
  Metallurgy: MetallurgyTasks,
  }
  


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
  const {playerData, setPlayerData, activeTask, setActiveTask, playerLevels, activeCombat} = useContext(PlayerDataContext)
  const irregularTasks = {'Combat': <CombatTasks/>, 'Arsenal': <ItemWindow/>, 'Skills':<AbilityWindow/>}
  const launchTask = (task, skill, playerData, setPlayerData) => {
    clearInterval(activeTask.taskId)
    var newTask;

    var load_task = tasks[skill].find((obj) => obj.name == task.name)

    if (activeTask.name != task.name && activeCombat == false) {
      var intervalId = setInterval(runTask, task.duration, load_task, skill, playerData, setPlayerData)
      newTask = {...task,
      taskId: intervalId}
    }
    else {
      newTask = {}
    } 
    setActiveTask(newTask)
  }

  var skill = props.skill
  return (
    <Box className="Tasks">
      {/* If irregular task, render special window. Otherwise list tasks out in a basic fashion */}
      {skill in irregularTasks ?  irregularTasks[skill]
          : tasks[skill].map((task, key) => 
          {
          return playerLevels[skill][0] >= task.levelRequirement ? 
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

