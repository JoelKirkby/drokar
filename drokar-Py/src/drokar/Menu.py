from drokar.Entity import Player
from drokar.Skill import Skill
import pickle
import os
import sys
import threading
SKILL_LIST=['Prospecting','Metallurgy','Fitness']
EQUIP_SLOTS=['gloves','boots','helm','armor','trinket','idol','off_hand','main_hand','cloak']
CURRENCIES=['Gold']


class Menu:
    def __init__(self):
        self.player_data=self.load_player_data()
        self.Player=Player(self.player_data)

    def main(self):
        print("Hello, please select an activity from the following menu:")
        selection=''
        while len(selection)!=1:
            selection = input('Press P for prospecting, M for Metallurgy, F for fitness\n')
        selection.lower()
        
        if selection=='p':
            selection=''
            while len(selection)!=1:
                selection = input('Which ore would you like to mine?\n (1) Copper Ore 5XP, (2) Tin Ore 5XP, (3) Flux 7XP\n Please enter your selection:')
    def save_player_data(self): #saves character data to a local .p file
        pickle.dump(self.player_data,open('data.p','wb'))

    def load_player_data(self): #loads character data from a .p file, if file doesn't exist then creates new character data
        if os.path.exists('data.p'):
            player_data=pickle.load(open('data.p','rb'))
            {player_data['skill_xp'].update({key:0}) for key in SKILL_LIST if key not in player_data['skill_xp']} 
            {player_data['skill_xp'].pop(key) for key in list(player_data['skill_xp']) if key not in SKILL_LIST}
        else:
            player_data={'skill_xp':{skill:0 for skill in SKILL_LIST},
                         'inventory':[],
                         'currency':{currency:0 for currency in CURRENCIES},
                         'equipment':{equip_slot:None for equip_slot in EQUIP_SLOTS}
                        }
        
        return player_data
        
