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

    def run_task(self,task,inventory,RunEvent):
        task_info=self.tasks[task]
        
        while RunEvent.is_set():
            print(f'\nPerforming {self.name} task: {task}')
            task_time=task_info['action_time']
            time.sleep(task_time)
            items = task_info['item_yield']
            for item in items:
                existing_item=next((i for i in inventory if i.name == item.name), False)
                if existing_item:
                    existing_item.quantity+=1
                else:
                    inventory.append(item)
                print(f'gained 1 {item.name}, you now have {item.quantity} in total') 
        None