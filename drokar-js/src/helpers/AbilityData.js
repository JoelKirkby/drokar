import spell_tired from '../helpers/images/abilities/spell_tired.svg';
import spell_green from '../helpers/images/abilities/spell_green.svg';
import spell_manaLeech from '../helpers/images/abilities/spell_manaLeech.svg';

import emptyPockets from '../helpers/images/abilities/spell_emptyPockets.svg';
import pilfer from '../helpers/images/abilities/spell_pilfer.svg';
import throatJab from '../helpers/images/abilities/spell_throatJab.svg';

import fortitude from '../helpers/images/abilities/spell_fortitude.svg';
import viciousStrike from '../helpers/images/abilities/spell_v.svg';
import armorTackle from '../helpers/images/abilities/spell_armorTackle.svg';

// ABILITIES
// abilityTypes = passive, spell, or attack
// spell = costs mana, will always cast when sufficient mana
// passive = always active, permanent changes to base stats
// proc = chance to proc on hit, includes 100% chances
// TBD - attack. Replaces default attack

export const ABILITIES = {
    'Acolyte':
    [
        {
            name: "It's greeeeeen!",
            description: "It's greeeeeen!: You're not entirely sure what it does, but it deals 25 damage and sometimes confuses foes. Unlocked at Acolyte level 5", //On mouseover will print description
            abilityType: 'spell', //Passive, proc, or spell
            img: spell_green, //image
            levelRequirement: 5,
            attackData: {
                name: "It's greeeeeen!",
                accuracy: 0.8,
                speed: 2600,
                damage: 25,
                type: "magic",
                manacost: 7,
                },
            attackType: 'magic',
            applyEffect: 'confuse',
            applyEffectChance: 0.1,
            applyTarget: 'enemy',
            applyEffectDuration: 5000,
        },
        {
            name: 'Mana Leech',
            description: 'Mana Leech: Chance to mana leech 25% of damage dealt. Unlocked at Acolyte Level 1', //On mouseover will print description
            abilityType: 'proc',
            levelRequirement: 1, //Passive, proc, or attack
            img: spell_manaLeech,
            chance: 0.25, //if proc or attack
            applyEffect: 'manaDrain',
            applyEffectChance: 0.25, // percent to drain
            applyEffectTarget: 'enemy',
            applyEffectAmount: 0.25,
        },
        {
            name: 'Energy Drain',
            description: 'Energy Drain: Enemies are slowed on hit for 2 seconds. Unlocked at Acolyte level 10', //On mouseover will print description
            abilityType: 'proc', //Passive, proc, or attack
            levelRequirement: 10,
            img: spell_tired,
            chance: 0.25, //if proc or attack
            applyEffect: 'slow',
            applyEffectChance: 1,
            applyEffectTarget: 'enemy',
            applyEffectDuration: 2000,
        },
    ],
    'Ruffian':
    [
        {
            name: "Throat Jab",
            img: throatJab,
            description: "Throat Jab: Attacks kickback your enemy's attack progress by 0.3 seconds. Unlocked at Ruffian level 5", //On mouseover will print description
            abilityType: 'proc', //Passive, proc, or attack
            // chance: //if proc or attack
            damage: 0,
            healing: 0, 
            levelRequirement: 5,
            applyEffect: 'pushback',
            applyEffectChance: 1,
            applyEffectTarget: 'enemy',
            applyStatusAmount: 300, 
        },
        {
            name: "Pilfer",
            img: pilfer,
            description: "Pilfer: Chance to steal some gold on hit. Unlocked at Ruffian level 1", //On mouseover will print description
            abilityType: 'proc', //Passive, proc, or attack
            // chance: //if proc or attack
            levelRequirement: 1,
            damage: 0,
            healing: 0, 
            applyStatusChance: 0.15,
            applyEffect: 'goldDrain',
            applyEffectTarget: 'enemy',
            applyEffectAmount: 5, 
        },
        {
            name: 'Empty Pockets',
            img: emptyPockets,
            description: 'Empty Pockets: Reduce enemy ranged and melee defenses based on the amount gold stolen. Unlocked at Ruffian level 10', //On mouseover will print description
            abilityType: 'proc',
            damage: 0,
            healing: 0,
            levelRequirement: 10,
            applyEffect: 'armorShred',
            applyEffectChance: 1,
            applyEffectTarget: 'enemy',
            applyEffectAmount: 'goldDrain',
        },
    ],
    'Warden':
    [
        {
            name: "Vicious Strike",
            img: viciousStrike, 
            description: "Vicious Strike: Chance to attack for 40% more damage. Unlocked at Warden level 5", //On mouseover will print description
            levelRequirement: 5,
            abilityType: 'proc', //Passive, proc, or attack
            procChance: 0.25,
            addedDamage: 0,
            damageMultiplier: 1.4,
            healing: 0, 
        },
        {
            name: 'Armor Tackle',
            description: 'Armor Tackle: Add 40% of your melee Armor to your attack damage. Unlocked at Warden level 1',
            levelRequirement: 1,
            img: armorTackle,  //On mouseover will print description
            abilityType: 'passive', //Passive, proc, or attack
            passiveEffect: {meleeArmorToDamage: 0.4},
        },
        {
            name: 'Fortitude',
            description: 'Fortitude: Take 25% less damage from all sources. Unlocked at Warden Level 10',
            levelRequirement: 10,
            img: fortitude,  //On mouseover will print description
            abilityType: 'passive', //Passive, proc, or attack
            passiveEffect: {damageReduction: 0.25},
        },
    ]
}  