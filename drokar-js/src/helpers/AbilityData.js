import spell_tired from '../helpers/images/abilities/spell_tired.svg';
import spell_green from '../helpers/images/abilities/spell_green.svg';
import spell_manaLeech from '../helpers/images/abilities/spell_manaLeech.svg';

import emptyPockets from '../helpers/images/abilities/spell_emptyPockets.svg';
import pilfer from '../helpers/images/abilities/spell_pilfer.svg';
import throatJab from '../helpers/images/abilities/spell_throatJab.svg';

import fortitude from '../helpers/images/abilities/spell_fortitude.svg';
import viciousStrike from '../helpers/images/abilities/spell_v.svg';
import armorTackle from '../helpers/images/abilities/spell_armorTackle.svg';


export const ABILITIES = {
    'Acolyte':
    [
        {
            name: 'Energy Drain',
            description: 'Chance to mana leech 25% of damage dealt', //On mouseover will print description
            abilityType: 'passive', //Passive, proc, or attack
            img: spell_tired,
            chance: 0.25, //if proc or attack
            applyStatusChance: 0.25,
            applyStatus: 'manaDrain',
        },
        {
            name: "It's greeeeeen!",
            description: 'A green spell of an origin of effect unknown to you, but it does 16 damage', //On mouseover will print description
            abilityType: 'attack', //Passive, proc, or attack
            img: spell_green, //image
            attackData: {
                name: "It's greeeeeen!",
                accuracy: 0.8,
                speed: 2600,
                damage: 2,
                type: "magic",
                manacost: 0,
                },
            chance: 0.75, //if proc or attack
            damage: 16,
            attackType: 'magic',
            applyStatusChance: 0.1,
            applyStatus: 'confuse',
        }
    ],
    'Ruffian':
    [
        {
            name: "Pilfer",
            description: "Chance to loot gold on hit", //On mouseover will print description
            abilityType: 'passive', //Passive, proc, or attack
            // chance: //if proc or attack
            damage: 0,
            healing: 0, 
            applyStatusChance: 0.15,
            applyStatus: 'goldDrain',
            applyStatusAmount: 5, 
        },
        {
            name: 'Empty Pockets',
            description: 'Reduces enemy ranged and melee defenses based on gold stolen', //On mouseover will print description
            abilityType: 'passive',
            img: null, //Passive, proc, or attack
            // chance: //if proc or attack
            damage: 0,
            healing: 0,
            applyStatusChance: 1,
            applyStatus: 'armorShred', 
            applyStatusAmount: 'goldDrain'
        },
    ],
    'Squire':
    [
        {
            name: "Vicious Strike",
            description: "Chance to attack for 40% more damage",
            img: null,  //On mouseover will print description
            abilityType: 'proc', //Passive, proc, or attack
            // chance: //if proc or attack
            damage: 0,
            damageMultiplier: 1.4,
            healing: 0, 
        },
        {
            name: 'Empty Pockets',
            description: 'Reduces enemy ranged and melee defenses based on gold stolen',
            img: null,  //On mouseover will print description
            abilityType: 'passive', //Passive, proc, or attack
            // chance: //if proc or attack
            damage: 0,
            healing: 0,
            applyStatusChance: 1,
            applyStatus: 'armorShred', 
            applyStatusAmount: 'goldDrain'
        },
    ]
}  