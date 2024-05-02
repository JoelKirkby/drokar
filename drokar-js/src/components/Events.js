import '../App.css'
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';
import ProgressLine from './ProgressLine';

function Events(props) {
    const {activeTask, setActivetask, playerData} = useContext(PlayerDataContext)
    let skill = activeTask.skill
    return (
      <div className="Events">
        <div>{activeTask.name} - {(activeTask.duration/1000).toFixed(2)}s</div>

        {JSON.stringify(activeTask) === "{}"
          ? <div className="testo"><p className="infoPanel">Click on Prospecting or Metallurgy to start a task or start fighting from the Combat window. You cannot work on tasks while in combat.
          <br/> Mine ores with Prospecting, smelt them with Metallurgy, smith bars into weapons and armor and fight the goblins! 
          <br/> You will unlock more tasks as you level up your skills.  </p></div>
          :  <div>
              {activeTask.name} - {(activeTask.duration/1000).toFixed(1)} seconds
              <ProgressLine key={playerData.skills[skill].toString()+activeTask.name} visualParts={[ 
                {
                  percentage:"100%",
                  color:"red",
                }
                ]} speed={activeTask.duration/1000}/>
              </div>}
      </div>
    );
  }
  
  export default Events;