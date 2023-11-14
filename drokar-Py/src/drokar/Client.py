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


@app.route("/")
def index():  # noqa: D103
    return render_template("index.html")


@app.route("/Prospecting")
def prospecting():
    return render_template("skillpage_base.html", skill=prosp.name, skill_data=prosp.tasks, level=prosp.level)


# @app.route("/Metallurgy")
# def metallurgy():
#     if request.method == "GET":
#         return render_template("metallurgy.html")


# @app.route("/Inventory")
# def inventory():
#     if request.method == "GET":
#         return render_template("bank.html")


# @app.route("/Store")
# def store():
#     if request.method == "GET":
#         return render_template("store.html")
class Client:
    def __init__(self):
        player_data = self.load_player_data()
        self.Player = Player(player_data)

    def main(self):
        app.run("127.0.0.1", 8080, debug=True)
    def save_player_data(self):  # saves character data to a local .p file
        pickle.dump(self.Player.player_data, open("data.p", "wb"))

    def load_player_data(self):
        # loads character data from a .p file, if file doesn't exist then creates new character data
        if os.path.exists("data.p"):
            player_data = pickle.load(open("data.p", "rb"))
            {player_data["skill_xp"].update({key: 0}) for key in SKILL_LIST if key not in player_data["skill_xp"]}
            {player_data["skill_xp"].pop(key) for key in list(player_data["skill_xp"]) if key not in SKILL_LIST}
        else:
            player_data = {
                "skill_xp": {skill: 0 for skill in SKILL_LIST},
                "inventory": [],
                "currency": {currency: 0 for currency in CURRENCIES},
                "equipment": {equip_slot: None for equip_slot in EQUIP_SLOTS},
            }

        return player_data

    def open_window(self):
        None
        HELLO =1 
