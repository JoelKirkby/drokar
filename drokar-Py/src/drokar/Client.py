import os
import threading
import os
import pickle
import sys
import threading

from Entity import Player
from Skill import SKILL_LIST, Skill

from flask import Flask, render_template, request

#Game data
EQUIP_SLOTS = ["gloves", "boots", "helm", "armor", "trinket", "idol", "off_hand", "main_hand", "cloak"]
CURRENCIES = ["Gold"]
prosp = Skill("Prospecting")

# Flask instance
TEMPLATE_DIR = os.path.abspath("templates")
app = Flask(__name__, template_folder=TEMPLATE_DIR)
app.config["UPLOAD_FOLDER"] = os.path.join(os.getcwd(), f"src{os.sep}drokar{os.sep}static{os.sep}images")
class Client:
    def __init__(self):
        None
    
    def run_task(self):
        None

    def open_window(self):
        None
        HELLO =1 
