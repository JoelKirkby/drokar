import { createContext, useState } from "react";


const DUMMY_INVENTORY = {
    "Copper Ore": {
        quantity: 69,
        index: 0,
    },
}

const playerInfo = {
    skills: {
        prospecting: 1,
        metallurgy: 1,
    },
    inventory: DUMMY_INVENTORY
};

export const PlayerDataContext = createContext(playerInfo)