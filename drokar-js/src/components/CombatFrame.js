import { LinearProgress, createTheme } from "@mui/material";
import { Favorite, AutoAwesome, Cyclone, ColorizeSharp } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import { calculateColor } from "../functions/calcs.js";
import CombatDetails from "./CombatDetails.js";
import "./Combat.css";

const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#3f51b5',
      },
      warning: {
        main: '#fda50f',
      },
    },
  });

function CombatFrame({combatData, name, attackProg, activeAttack}) {
    var percentHp = combatData.currentHp / combatData.maxHp * 100
    var percentMana = combatData.currentMana / combatData.maxMana * 100
    var percentFury = combatData.currentFury / combatData.maxFury * 100
    var attackSpeed = combatData.attackSpeed
    var healthColor = calculateColor(percentHp)

    return (
    <div className="combatFrame">
        <div className="combatPanel">
            <div className="flexContainer">
                {combatData.currentHp <= 0 
                ? <p>You R ded lmoa</p>
                : <img src={combatData.img} alt="fighter"/>
                }
                
            </div>
            <div className="combatBarIcon">
            
            <LinearProgress 
                value={percentHp} 
                variant="determinate" 
                // color="success" 
                sx={{
                    backgroundColor: 'white',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: healthColor},
                    width:"75%",
                    margin: "0 5px",
                    }} />
            <Favorite style={{fill: healthColor}}/>
            {combatData.currentHp}/{combatData.maxHp}
            </div>

            <div className="combatBarIcon">
                <ThemeProvider theme={theme}>
                <LinearProgress 
                    value={percentMana} 
                    variant="determinate" 
                    color="secondary"
                    sx={{
                        width:"75%",
                        margin: "0 5px",
                        }} />
                <AutoAwesome color="primary"/>
                {combatData.currentMana}/{combatData.maxMana}
                </ThemeProvider>
            </div>

            <div className="combatBarIcon">
                <LinearProgress 
                    value={percentFury} 
                    variant={percentFury >= 100 ? "indeterminate" : "determinate"}  /* Animate when full */
                    color="warning"
                    sx={{
                        width:"75%",
                        margin: "0 5px",
                        }} />
                <Cyclone color="warning"/>
                {combatData.currentFury}/{combatData.maxFury} 
            </div>
            {activeAttack.length > 0  ? <p className="attackName">{activeAttack[0]} - {(activeAttack[1] / 1000).toFixed(2)}s</p> : null}
            {activeAttack.length > 0  ?
                <div className="combatBarIcon">
                    <LinearProgress 
                        value={attackProg} 
                        variant={"determinate"} /* Animate when full */
                        color="error"
                        sx={{
                            width:"75%",
                            margin: "0 5px",
                            "& .MuiLinearProgress-bar": {
                                transition: "transform .1s linear"
                            }
                            }} />
                    <ColorizeSharp color="error" sx={{transform: "scaleY(-1)"}}/>
                    {(combatData.attackSpeed/1000).toFixed(2)} /s
            </div>
            : null}
        </div>
        <CombatDetails combatData={combatData} name={name}/>
    </div>
    );
  }
  
  export default CombatFrame;