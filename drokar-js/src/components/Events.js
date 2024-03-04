import '../App.css'
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';

function Events() {
    const {activeTask, setActivetask} = useContext(PlayerDataContext)
    return (
      <div className="Events">
        Events
        <div>{activeTask.name}</div>
      </div>
    );
  }
  
  export default Events;