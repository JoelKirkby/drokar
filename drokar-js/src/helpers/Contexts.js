import { createContext, useState } from "react";
import hero from './images/ui/hero.svg'
import { ABILITIES } from "./AbilityData";

const DUMMY_INVENTORY = {
    "Copper Ore": {
        quantity: 69,
        index: 0,
    },
    "Bronze Axe": {
        quantity: 1,
        index: 1,
    }
}

const DUMMY_EQUIPMENT = {
    weapon: '',
    offHand:'',
    helmet: '' ,
    body: '',
    leg: '',
    feet: '',
    // quantities = {ammo: 1} Consider things with quantities eg. ammo

}

const DUMMY_COMBAT_STATS = {
    maxHp: 50,
    img: hero,
    currentHp : 50,
    currentMana: 20,
    maxMana: 20,
    meleeDamage: 1,
    furyRate: 20,
    addedDamage: 0,
    rangedDamage: 0, // 0 for now, will be added later
    magicDamage: 0, // 0 for now, will be added later
    attackSpeed: 2600, //ms
    spells: [],
    onHitEffects: [],
    attacks: [
        {
            name: "Attack",
            accuracy: 0.8,
            speed: 3500,
            damage: 0,
            type: "melee",
            manacost: 0,
        },
        {
            name: "Vicious Strike",
            accuracy: 0.9,
            speed: 1500,
            damage: 4,
            type: "melee",
            manacost: 0,
        },
    ],
    attackChances: [0.7, 0.3],
    currentFury: 1,
    furyAttacks : [
        {
        name: "Drokar's Might",
        accuracy: 1,
        speed: 2500,
        damage: 20,
        type: "melee",
        damageMultiplier: 1.5,
        manaCost: 0
        }
    ],
    furyAttackChances : [1],
    maxFury: 100,
    meleeArmor: 1,
    rangedArmor: 2,
    magicArmor: 3,
    damageReduction : 1,
}

const playerInfo = {
    name: "Kitadel",
    skills: {
        Prospecting: 0,
        Metallurgy: 0,
        Acolyte: 50,
        Ruffian: 650, 
        Warden: 3,
    },
    inventory: DUMMY_INVENTORY,
    gold: 0,
    equipped: DUMMY_EQUIPMENT,
    combatStats: DUMMY_COMBAT_STATS,
    activeVocation: "",
    flexAbility0: null,
    flexAbility1: null,
};

export const PlayerDataContext = createContext(playerInfo)