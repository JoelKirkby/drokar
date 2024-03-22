import goblin from './images/goblin.svg';
import goblinWizard from './images/goblinWizard.svg';

export const MonsterData = {
    'Goblin':{
        combatStats: {
            level: 2,
            img: goblin,
            maxHp: 8,
            maxMana: 10,
            furyRate: 0,
            meleeDamage: 2, 
            rangedDamage: 0,
            magicDamage: 0,
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
            meleeArmor: 0,
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
            maxHp: 40,
            maxMana: 10,
            furyRate: 15,
            // Keeping it simple with just damage and speed, will allow for multiple attacks and types of attacks later.
            meleeDamage: 2,
            magicDamage: 5,
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
                        speed: 4000,
                        damage: 8,
                        type: "magic",
                        manacost: 8,
                        }
            ],
            attackChances: [0.8, 0.2],
            furyAttacks : [
                            {
                            name: "WAAAAAAAGH",
                            accuracy: 1,
                            speed: 4000,
                            damage: 15,
                            type: "magic",
                            manacost: 0,
                            },
                        ],
            furyAttackChances : [1],
            maxFury: 100, 
            meleeArmor:0,
            rangedArmor: 0,
            magicArmor: 0,
        },
        dropRates: [0.4],
        drops: ["Bronze Axe"],        
    }
}