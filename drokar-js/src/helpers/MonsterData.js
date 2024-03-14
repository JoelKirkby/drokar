import goblin from './images/goblin.svg';
import goblinWizard from './images/goblinWizard.svg';

export const MonsterData = {
    'Goblin':{
        level: 2,
        img: goblin,
        maxHp: 50,
        maxMana: 10,
        furyRate: 0,
        damage: 2, 
        attackSpeed: 2600, //ms
        // attacks: {"Attack":  TODO - Keep it simple for now.
        //             {
        //             accuracy: 0.8,
        //             speed: 2600,
        //             damage: 10,
        //             type: "melee",
        //             manacost: 0,
        //             }
        //         },
        attackChances: [1],
        defenses: {melee: 0,
                    missile: 0,
                    magic: 0},
    },

    'Goblin Wizard' :{
        level: 4,
        img: goblinWizard,
        maxHp: 50,
        maxMana: 10,
        furyRate: 1,
        // Keeping it simple with just damage and speed, will allow for multiple attacks and types of attacks later.
        damage: 2,
        attackSpeed: 2600, //ms
        // attacks: {"Attack": 
        //             {
        //             accuracy: 0.8,
        //             speed: 2600,
        //             damage: 2,
        //             type: "melee",
        //             manacost: 0,
        //             },
        //             "Earth Shard":
        //             {
        //             accuracy: 0.8,
        //             speed: 5000,
        //             damage: 8,
        //             type: "magic",
        //             manacost: 8,
        //             }
        //         },
        attackChances: [1],
        furyAttacks : {"WAAAAAAAGH": 
                        {
                        accuracy: 0.7,
                        speed: 4000,
                        damage: 15,
                        type: "magic",
                        manacost: 0,
                        },
        },
        furyAttackChances : [1],
        defenses: { melee: 0,
                    missile: 0,
                    magic: 0},
    },        
}