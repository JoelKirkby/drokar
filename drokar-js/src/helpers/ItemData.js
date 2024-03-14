import pickaxe from  './images/pickaxe.svg'
import tin from './images/greenstone.svg'
import bar from './images/bar.svg'
import copper from './images/stone.svg'
import bronzeAxe from './images/bronzeAxe.svg'
import platemail from './images/platemail.svg'
import plateleg from './images/plateleg.svg'
import platehelm from './images/helmet.svg'
import shield from './images/shield.svg'

export const ItemData = {
    // Prospecting items
    "Copper Ore":{
        sellValue: 5,
        description: "A red ore, can be refined using Metallurgy",
        image: copper,
        acquiredBy: ["Prospecting Level 1", "Combat"],
        usedIn: {'Metallurgy':1}
        },
    "Tin Ore":
        {
        sellValue: 5,
        description: "A faint silver ore, can be refined using Metallurgy",
        image: tin,
        acquiredBy: ["Prospecting Level 1", "Combat"],
        usedIn: {'Metallurgy':1}
        },

    "Silver Ore":
        {
        sellValue: 5,
        description: "A faint silver ore, can be refined using Metallurgy",
        image: tin,
        acquiredBy: ["Prospecting Level 10", "Combat"],
        usedIn: {'Metallurgy':10}
        },

    // Bronze items - Metallurgy
    'Bronze Bar':
        {
            sellValue: 15, 
            description: 'A refined brown bar which can be used to make weapons, armor, and vessels',
            image: bar,
        },
    'Bronze Axe':
        {
            sellValue: 20,
            description: "A crude axe fashioned from Bronze that can be used to fight.",
            image: bronzeAxe,
            equip: 'weapon',
            combatStats: {damage: 5, attackSpeed: 3}
        },
    'Bronze Helmet':
    {
        sellValue: 20,
        description: "A crude helmet fashioned from Bronze that can be used to fight.",
        image: platehelm,
        equip: 'helmet',
        combatStats: {armor: 3, magicArmor: -1, maxHealth: 5 }
    },
    'Bronze Buckler':
    {
        sellValue: 20,
        description: "A crude shield from Bronze that can be used for protection.",
        image: shield,
        equip: 'offHand',
        combatStats: {armor: 3, magicArmor: -1, health: 5, blockChance: 15, blockAmount: 2}
    },
    'Bronze Leggings':
    {
        sellValue: 20,
        description: "Crude plate skirt fashioned from Bronze that can be used to fight.",
        image: plateleg,
        equip: 'leg',
        combatStats: {armor: 5, magicArmor: -1, maxHealth: 5 }
    },
    'Bronze Platemail':
    {
        sellValue: 20,
        description: "Crude platemail fashioned from Bronze that can be used to fight.",
        image: platemail,
        equip: 'body',
        combatStats: {armor: 8, magicArmor: -1, maxHealth: 10}
    },
}
