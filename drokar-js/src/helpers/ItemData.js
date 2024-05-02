import pickaxe from  './images/items/pickaxe.svg'
import tin from './images/items/greenstone.svg'
import copper from './images/items/stone.svg'

import bar from './images/items/bar.svg'
import bronzeAxe from './images/weapons/bronzeAxe.svg'

import platemail from './images/armor/platemail.svg'
import plateleg from './images/armor/plateleg.svg'
import platehelm from './images/armor/helmet.svg'
import shield from './images/armor/shield.svg'

export const ItemData = {
    // Prospecting items
    "Copper Ore":{
        sellValue: 5,
        description: "A red ore, can be refined using Metallurgy. It's red, trust me.",
        image: copper,
        acquiredBy: ["Prospecting Level 1", "Combat"],
        usedIn: {'Metallurgy':1}
        },
    "Tin Ore":
        {
        sellValue: 5,
        description: "A faint silver ore, smelt with Copper Ore using Metallurgy",
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
            combatStats: {
                meleeDamage: 5, 
                attackSpeed: 3000}
        },
    'Bronze Helmet':
    {
        sellValue: 20,
        description: "A crude helmet fashioned from Bronze that can be used to fight.",
        image: platehelm,
        equip: 'helmet',
        combatStats: {
            meleeArmor: 3, 
            magicArmor: -1, 
            maxHp: 5 
        }
    },
    'Bronze Buckler':
    {
        sellValue: 20,
        description: "A crude shield from Bronze that can be used for protection.",
        image: shield,
        equip: 'offHand',
        combatStats: {
            meleeArmor: 3,
            rangedArmor: 5, 
            magicArmor: -1, 
            maxHp: 5, 
            blockChance: 15, 
            blockAmount: 2
        }
    },
    'Bronze Leggings':
    {
        sellValue: 20,
        description: "Crude plate skirt fashioned from Bronze that can be used to fight.",
        image: plateleg,
        equip: 'leg',
        combatStats: {
            meleeArmor: 5, 
            rangedArmor: 7,
            magicArmor: -1, 
            maxHp: 5 
        }
    },
    'Bronze Platemail':
    {
        sellValue: 20,
        description: "Crude platemail fashioned from Bronze that can be used to fight.",
        image: platemail,
        equip: 'body',
        combatStats: {
            meleeArmor: 8, 
            rangedArmor: 12,
            magicArmor: -2, 
            maxHp: 10
        }
    },
}
