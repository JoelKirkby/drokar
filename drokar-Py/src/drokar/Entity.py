class Entity:
    def __init__(self):
        self.HP=None
        self.MP=None
        self.level=None
        self.inventory={} #!TODO load inventory from some player data
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
    def __init__(self):
        self.HP=None
        self.MP=None

    def update_stats(self):
        # Check if any new bonuses or equipment applied, then change player status accordingly
        None
    
    def equip(self):
        #equips an item and calls update_stats to ensure new stats are applied
        None

    def consume_item(self):
        #entity consumes an item, adjusts player stats based on it.
        # food = healing, potion = enhance stats etc.
        None