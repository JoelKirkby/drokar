import { ListItem, Box, ListItemButton, ListItemIcon, ListItemText, Divider, List, LinearProgress } from "@mui/material";
import { Landscape, Gavel, ColorizeSharp, Castle, Hub, Forest } from "@mui/icons-material";



function SideBar({playerLevels, setActiveSkill}) {
    var iconMap = {
        'Prospecting': <Landscape />, 
        'Metallurgy': <Gavel />, 
        'Combat': <ColorizeSharp/>, 
        'Arsenal': <Castle />, 
        'Skills': <Hub />,
        'Monsters': <Forest/>
    }
    
    return (
            <Box sx={{ width: '100%',
                      // backgroundColor: (theme) => theme.palette.mode === "light" ? "f5f5f5" : "#0f0f0f"
            }} role="presentation" bcolor="dark">
              <List>
                {['Prospecting', 'Metallurgy'].map((text, index) => (
                  <Box>
                  <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => setActiveSkill(text)}>
                      <ListItemIcon>
                        {iconMap[text]}
                      </ListItemIcon>
                      <ListItemText primary={`${text} Lv ${playerLevels[text][0]}`} />
                    </ListItemButton>
                  </ListItem>
                  <Box sx={{width: "100%", display: "block", paddingRight: "20px"}}>
                     <LinearProgress sx={{margin:"0 auto"}} value={playerLevels[text][1]} variant="determinate" />
                  </Box>
                  </Box>
                ))}
              </List>
              <Divider />
              <List>
                {['Monsters', 'Combat', 'Arsenal', 'Skills'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                     <ListItemButton onClick={() => setActiveSkill(text)}>
                      <ListItemIcon>
                        {iconMap[text]}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
    );
  }
  
export default SideBar;