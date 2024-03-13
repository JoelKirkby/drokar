import pickaxeImg from  './images/pickaxe.svg'
import metallurgyImg from './images/greenstone.svg'
import barImg from './images/bar.svg'
import stoneImg from './images/stone.svg'

export const ItemData = {
    "Copper Ore":{
        'sellValue': 5,
        'description': "A red ore, can be refined using Metallurgy",
        'image': stoneImg,
        },
    "Tin Ore":
        {
        'sellValue': 5,
        'description': "A faint silver ore, can be refined using Metallurgy",
        'image': metallurgyImg,
        },

    "Silver Ore":
        {
        'sellValue': 5,
        'description': "A faint silver ore, can be refined using Metallurgy",
        'image': metallurgyImg,
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
        },
    'Bronze Helmet':
    {
        sellValue: 20,
        description: "A crude helmet fashioned from Bronze that can be used to fight.",
        image: platehelm,
        equip: 'helmet',
    },
    'Bronze Buckler':
    {
        sellValue: 20,
        description: "A crude shield from Bronze that can be used for protection.",
        image: shield,
        equip: 'offHand',
    },
    'Bronze Leggings':
    {
        sellValue: 20,
        description: "Crude plate skirt fashioned from Bronze that can be used to fight.",
        image: plateleg,
        equip: 'leg',
    },
    'Bronze Platemail':
    {
        sellValue: 20,
        description: "Crude platemail fashioned from Bronze that can be used to fight.",
        image: platemail,
        equip: 'body',
    },
}
