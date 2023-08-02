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
        
