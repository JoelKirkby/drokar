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
    
    'Bronze Bar':
        {
            sellValue: 15, 
            description: 'A refined brown bar which can be used to make weapons, armor, and vessels',
            image: barImg,
        }   
}
