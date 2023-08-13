from drokar.Item import Item
import time

SKILL_XPDIFF_PER_LEVEL=[int(100*1.104**x) for x in range(0,99)]
TOTAL_XPS=[0]

for num,el in enumerate(SKILL_XPDIFF_PER_LEVEL):
    level_XP=TOTAL_XPS[num]+el
    TOTAL_XPS.append(level_XP)

SKILL_LIST=['Prospecting','Metallurgy','Fitness']

MINING_TASKS = {'Copper Ore':
                    {'lvl_requirement':1,
                     'XP_gain':30,
                     'item_yield':[Item('Copper Ore')],
                     'action_time':1.5
                     },
                 'Tin Ore': {
                     'lvl_requirement':1,
                     'XP_gain':10,
                     'item_yield':[Item('Tin Ore')],
                     'action_time':1.5
                 },     
                 'Silver Ore': {
                     'lvl_requirement':10,
                     'XP_gain':30,
                     'item_yield':[Item('Silver Ore')],
                     'action_time':2
                 }  
                } 

METALLURGY_TASKS = {'Bronze Bar':
                    {'lvl_requirement':1,
                     'XP_gain':20,
                     'item_yield':[Item('Bronze Bar')],
                     'requires':['Copper Ore', 'Tin Ore'],
                     'action_time':1.5
                     } 
                }

FITNESS_TASKS={}

TASK_INDEX={'Prospecting':MINING_TASKS,
            'Metallurgy':METALLURGY_TASKS,
class Skill:
    def __init__(self,name,total_xp=0):
        self.total_xp = total_xp
        self.name = name
        self.tasks = TASK_INDEX[name]
        self.level = self.calculate_level()
        self.available_tasks={}
        self.check_for_unlocks()

    def xp_to_next_level(self,total_xp):
        level_xp = TOTAL_XPS[self.level]#-TOTAL_XPS[self.level-1]
        xp_difference= level_xp - total_xp
        if xp_difference < 0:
            self.level+=1
            print(f"You leveled up from {self.level-1} to {self.level}!")
            self.check_for_unlocks(level_up=True)
            level_xp = TOTAL_XPS[self.level] # - TOTAL_XPS[self.level-1]
            xp_difference = level_xp - total_xp
            level_up=True        
        else:
            level_up=False
        
        print(f'{xp_difference} XP until level {self.level+1}')
        return xp_difference, level_up            

    def calculate_level(self):
        for i, xp_value in enumerate(TOTAL_XPS[:-1]):
            if self.total_xp >= xp_value and self.total_xp < TOTAL_XPS[i+1]:
                level=i+1
                break
        
        return level

    def check_for_unlocks(self,level_up=False) -> None:
        '''
        Check for available tasks based on skill level. Default mode of operation (level_up==False) is for populating available tasks on data load
        level_up==True
        '''
        for task, properties in self.tasks.items():
            new_unlock = properties['lvl_requirement']==self.level and level_up # Check if level up unlocked anything new
            already_unlocked = task not in self.available_tasks and properties['lvl_requirement']<=self.level # Populate available tasks based on level

            if new_unlock or already_unlocked:
                self.available_tasks.update({task:properties})
                if new_unlock:
                    print(f"At level {self.level} you unlocked {task}!")
    def run_task(self,task,player_data,RunEvent):
        task_info=self.tasks[task]
        item_requirement = task_info.get('requires',False)

        inventory=player_data['inventory']
        skill_xp=player_data['skill_xp'][self.name]

        while RunEvent.is_set():
            print(f'\nPerforming {self.name} task: {task}')

            if item_requirement:
                for item in item_requirement:
                    find_item = existing_item=next((i for i in inventory if i.name == item), False)
                    if not find_item or find_item.quantity<1:
                        print(f"Not enough {item} in inventory, enter any key to continue:")
                        RunEvent.clear()
                        return
                    find_item.quantity-=1

            task_time=task_info['action_time']
            time.sleep(task_time)

            items = task_info['item_yield']

            #Gain XP, check for level ups
            player_data['skill_xp'][self.name] += self.tasks[task]['XP_gain']
            self.xp_to_next_level(player_data['skill_xp'][self.name])
            


            for item in items:
                existing_item=next((i for i in inventory if i.name == item.name), False)
                if existing_item:
                    existing_item.quantity+=1
                    quantity=existing_item.quantity
                else:
                    inventory.append(item)
                    quantity=item.quantity
                print(f'gained 1 {item.name}, you now have {quantity} in total') 

