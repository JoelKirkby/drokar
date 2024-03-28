import { ListItem, Box, ListItemButton, ListItemIcon, ListItemText, Divider, List, LinearProgress } from "@mui/material";
import { Landscape, Gavel, ColorizeSharp, Castle, Hub } from "@mui/icons-material";

function SideBar({playerLevels, setActiveSkill}) {
    var iconMap = {
        'Prospecting': <Landscape />, 
        'Metallurgy': <Gavel />, 
        'Combat': <ColorizeSharp/>, 
        'Arsenal': <Castle />, 
        'Skills': <Hub />
    }
    
    return ( 
            <Box sx={{ width: 250 }} role="presentation">
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
                {['Combat', 'Arsenal', 'Skills'].map((text, index) => (
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