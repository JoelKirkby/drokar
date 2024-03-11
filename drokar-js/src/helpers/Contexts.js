import { createContext, useState } from "react";


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

const playerInfo = {
    skills: {
        Prospecting: 0,
        Metallurgy: 0,
    },
    inventory: DUMMY_INVENTORY,
    gold: 0,
    equipped: DUMMY_EQUIPMENT
};

export const PlayerDataContext = createContext(playerInfo)