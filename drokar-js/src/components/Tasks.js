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
