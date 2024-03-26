import { ItemData } from './ItemData'

export const ProspectingTasks = [
    {
        name: "Mine Copper Ore",
        xpGain: 5,
        levelRequirement: 1,
        image: ItemData['Copper Ore'].image,
        yields: {"Copper Ore":1},
        consumes: {},
        duration: 1000,
        skill: "Prospecting",
    },
    {
        name: "Mine Tin Ore",
        xpGain: 5,
        levelRequirement: 1,
        image: ItemData['Tin Ore'].image,
        yields: {"Tin Ore":1},
        consumes: {},
        duration: 2000,
        skill: "Prospecting",
    },
    {
        name: "Mine Silver Ore",
        xpGain: 5,
        levelRequirement: 10,
        image: ItemData['Silver Ore'].image,
        yields: {"Silver Ore":1},
        consumes: {},
        duration: 200,
        skill: "Prospecting",
    },

]


export const MetallurgyTasks = [
    {
        name: "Smelt Bronze Bar",
        xpGain: 10,
        levelRequirement: 1,
        image: ItemData["Bronze Bar"].image,
        yields: {"Bronze Bar":1},
        consumes: {"Tin Ore": 1, "Copper Ore":1},
        duration: 3000,
        skill: "Metallurgy",
    },
    {
        name: "Forge Bronze Axe",
        xpGain: 25,
        levelRequirement: 3,
        image: ItemData["Bronze Axe"].image,
        yields: {"Bronze Axe":1},
        consumes: {"Bronze Bar":3},
        duration: 2500,
        skill: "Metallurgy",
    },
    {
        name: "Bronze Helmet",
        xpGain: 25,
        levelRequirement: 5,
        image: ItemData["Bronze Helmet"].image,
        yields: {"Bronze Helmet":1},
        consumes: {"Bronze Bar":3},
        duration: 2500,
        skill: "Metallurgy"
    },
    {
        name: "Bronze Buckler",
        xpGain: 25,
        levelRequirement: 6,
        image: ItemData["Bronze Buckler"].image,
        yields: {"Bronze Buckler":1},
        consumes: {"Bronze Bar":3},
        duration: 2500,
        skill: "Metallurgy",
    },
    {
        name:'Bronze Leggings',
        xpGain: 40,
        levelRequirement: 6,
        image: ItemData['Bronze Leggings'].image,
        yields: {'Bronze Leggings':1},
        consumes: {"Bronze Bar":5},
        duration: 2500,
        skill: "Metallurgy",
    },
    {
        name:'Bronze Platemail',
        xpGain: 50,
        levelRequirement: 10,
        image: ItemData['Bronze Platemail'].image,
        yields: {'Bronze Platemail':1},
        consumes: {"Bronze Bar":5},
        duration: 2500,
        skill: "Metallurgy",
    },
]

