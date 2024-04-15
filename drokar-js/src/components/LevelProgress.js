import '../App.css'
import './AbilityWindow.css'
import { LinearProgress } from "@mui/material"
import { useContext } from "react"
import { PlayerDataContext } from "../helpers/Contexts"

function LevelProgress({skill, size}) {
  const {playerLevels, activeVocation} = useContext(PlayerDataContext)
  return (
      <div className='vocationXp'>
        <a>Level {playerLevels[skill][0]}</a>
        <div className="vocationProgressBar">
          <LinearProgress style={{padding: `${size}px`, borderRadius: "5px"}} variant="determinate" value={playerLevels[skill][1]}/>
        </div>
        <a>{playerLevels[skill][1].toFixed(1)}%</a>
      </div>
  )
}

export default LevelProgress
