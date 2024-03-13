import '../App.css'
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';

function Events() {
    const {activeTask, setActivetask} = useContext(PlayerDataContext)
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