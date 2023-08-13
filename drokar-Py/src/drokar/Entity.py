from drokar.Skill import Skill, SKILL_LIST

class Entity:
    def __init__(self):
        self.HP=None
        self.MP=None
        self.level=None
        self.inventory=[] #!TODO load inventory from some player data
        self.experience={} #!TODO populate skill list from somewhere dynamic

    def level_up(self,skill):
        #Levels up a skill, triggers events for milestones
        None

    def calculate_hit(self,target):
        None
    
    def calculate_damage_given(self,target):
        None
    
    def death(self):
        self.inventory={}

class Player(Entity):
    def __init__(self,player_data):
        
        #Initialize player data - experience, levels, inventory, currencies
        self.player_data=player_data
        self.inventory=player_data['inventory']
        self.skill_xp=player_data['skill_xp']
        self.skill_levels={}
        self.currency=player_data['currency']

        #Initialize Skills
        self.skills={skill_name: Skill(skill_name,total_xp=self.skill_xp[skill_name]) for skill_name in SKILL_LIST}

    def update_stats(self):# Check if any new bonuses or equipment applied, then change player status accordingly
        None #TODO
    
    def equip_item(self): #equips an item and calls update_stats to ensure new stats are applied
        None #TODO

    def consume_item(self):
        #entity consumes an item, adjusts player stats based on it.
        # food = healing, potion = enhance stats etc.
        None
    
    def say_hello(self):
        #test source control