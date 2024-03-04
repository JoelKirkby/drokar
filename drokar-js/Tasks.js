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

const Tasks = (props) => {
    const {playerData, setPlayerData, activeTask, setActiveTask} = useContext(PlayerDataContext)
    // TODO, this function gets loaded on every render. Ineffecient

    const launchTask = (task, skill, playerData, setPlayerData) => {
      console.log(`activeInterval = ${activeTask.taskId}`)
      
      clearInterval(activeTask.taskId)
      let intervalId = 0;
      let name = ''

      if (activeTask.name != task.name) {
        intervalId = setInterval(runTask, task.duration, task, skill, playerData, setPlayerData)
        name = task.name
      } 

      setActiveTask({
        name: name,
        taskId: intervalId
      })
    }

    // For testing only
    useEffect(() => {
      console.log("Run task was rendered")
    }, [runTask])
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



