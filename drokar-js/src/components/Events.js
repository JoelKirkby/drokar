import '../App.css'
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';
import ProgressLine from './ProgressLine';

function Events(props) {
    const {activeTask, setActivetask, playerData} = useContext(PlayerDataContext)
    let skill = activeTask.skill
    return (
      <div className="Events">
        Events
        <div>{activeTask.name}</div>

        {JSON.stringify(activeTask) === "{}"
          ? null
          : <ProgressLine key={playerData.skills[skill].toString()+activeTask.name} visualParts={[ 
                {
                  percentage:"100%",
                  color:"red",
                }
                ]} speed={activeTask.duration/1000}/>
              }
      </div>
    );
  }
  
  export default Events;