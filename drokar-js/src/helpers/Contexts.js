import { createContext, useState } from "react";
import hero from './images/hero.svg'

const DUMMY_INVENTORY = {
    "Copper Ore": {
        quantity: 69,
        index: 0,
    },
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
    currentHp : 20,
    currentMana: 10,
    maxMana: 20,
    damage: 1,
    attackSpeed: 2000,
    currentFury: 1,
    maxFury: 100,
    armor: 1,
    rangedArmor: 2,
    magicArmor: 3,
}

const playerInfo = {
    skills: {
        Prospecting: 0,
        Metallurgy: 0,
    },
    inventory: DUMMY_INVENTORY,
    gold: 0,
    equipped: DUMMY_EQUIPMENT,
    combatStats: DUMMY_COMBAT_STATS
};

export const PlayerDataContext = createContext(playerInfo)