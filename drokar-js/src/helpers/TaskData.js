import metallurgyImg from './images/greenstone.svg'
import barImg from './images/bar.svg'
import stoneImg from './images/stone.svg'
import greenstoneImg from './images/greenstone.svg'

export const ProspectingTasks = [
    {
        name: "Mine Copper Ore",
        xpGain: 5,
        levelRequirement: 1,
        image: stoneImg,
        yields: {"Copper Ore":1},
        consumes: {},
        duration: 1000,
    },
    {
        name: "Mine Tin Ore",
        xpGain: 5,
        levelRequirement: 1,
        image: greenstoneImg,
        yields: {"Tin Ore":1},
        consumes: {},
        duration: 4000,
    },
    {
        name: "Mine Silver Ore",
        xpGain: 5,
        levelRequirement: 10,
        image: greenstoneImg,
        yields: {"Silver Ore":1},
        consumes: {},
        duration: 200,
    },
]


export const MetallurgyTasks = [
    {
        name: "Smelt Bronze Bar",
        xpGain: 10,
        levelRequirement: 1,
        image: barImg,
        yields: {"Bronze Bar":1},
        consumes: {"Tin Ore": 1, "Copper Ore":1},
        duration: 3000,
    },
]
