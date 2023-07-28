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
        self.skill_levels={}
        self.player_data=self.load_player_data()

    def update_stats(self):
        # Check if any new bonuses or equipment applied, then change player status accordingly
        None
    
    def equip(self):
        #equips an item and calls update_stats to ensure new stats are applied
        None

    def save_player_data(self):
        pickle.dump(self.player_data,open('data.p','wb'))

    def load_player_data(self):
        if os.path.exists('data.p'):
            self.player_data=pickle.load(open('data.p','rb'))
        else:
            self.player_data={'Skill_xp':{skill:0 for skill in SKILL_LIST},
                         'Inventory':{},
                         'Equipment':{equip_slot:None for equip_slot in EQUIP_SLOTS}
                        }
        
        self.calculate_skill_levels()

    def calculate_skill_levels(self):
        for skill,XP_total in self.player_data['Skill_xp'].items():
            for i, xp_value in enumerate(TOTAL_XPS[:-1]):
                if XP_total >= xp_value and XP_total < TOTAL_XPS[i+1]:
                    self.skill_levels[skill]=i+1
    def consume_item(self):
        #entity consumes an item, adjusts player stats based on it.
        # food = healing, potion = enhance stats etc.
        None
    
    def say_hello(self):
        #test source control