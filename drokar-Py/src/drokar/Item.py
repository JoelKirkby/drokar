'''Item properties
in order
0: Sell value - int
1: Description - str
2: Can equip - bool
3: Requirements - dict {skill (str): level (int)} for each skill
4: Combinations - dict {'item' (str) :product (Item)}
'''

item_list={'Copper Ore':[5,'A red ore, can be refined using Metallurgy',False,{}],
           'Tin Ore': [5, 'A faint silver ore, can be refined using Metallurgy',False,{}],
           'Silver Ore': [35, 'A shimmering silver ore, can be refined using Metallurgy',False,{}],
           
           'Bronze Bar':[15, 'A refined brown bar which can be used to make weapons, armor, and vessels',False,{'Metallurgy':1}]}

class Item:
    def __init__(self,item_name):
        item_properties=item_list[item_name]
        self.name=item_name
        self.sell_value, self.description, self.equippable,self.requirements=item_properties
        self.quantity=1

    def combine(self):
        None
