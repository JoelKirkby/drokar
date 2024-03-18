import goblin from './images/goblin.svg';
import goblinWizard from './images/goblinWizard.svg';

export const MonsterData = {
    'Goblin':{
        combatStats: {
            level: 2,
            img: goblin,
            maxHp: 80,
            maxMana: 10,
            furyRate: 0,
            damage: 2, 
            attackSpeed: 2600, //ms
            attacks: [
                        {
                        name: "Attack",
                        accuracy: 0.8,
                        speed: 2600,
                        damage: 2,
                        type: "melee",
                        manacost: 0,
                        }
            ],
            attackChances: [1],
            armor: 0,
            rangedArmor: 0,
            magicArmor: 0,
        },
        dropRates: [0.2],
        drops: ["Tin Ore"],
    },

    'Goblin Wizard' : {
        combatStats: {
            level: 4,
            img: goblinWizard,
            maxHp: 8,
            maxMana: 10,
            furyRate: 1,
            // Keeping it simple with just damage and speed, will allow for multiple attacks and types of attacks later.
            damage: 2,
            attackSpeed: 2600, //ms
            attacks: [
                        {
                        name: "Attack",
                        accuracy: 0.8,
                        speed: 2600,
                        damage: 2,
                        type: "melee",
                        manacost: 0,
                        },
                        {
                        name: "Earth Shard",
                        accuracy: 0.8,
                        speed: 5000,
                        damage: 8,
                        type: "magic",
                        manacost: 8,
                        }
            ],
            attackChances: [0.8, 0.2],
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
            armor:0,
            rangedArmor: 0,
            magicArmor: 0,
        },
        dropRates: [0.2],
        drops: ["Bronze Axe"],        
    }
}