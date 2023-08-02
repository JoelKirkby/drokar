from drokar.Item import Item
import time


mining_tasks = {'Copper Ore':
                    {'lvl_requirement':1,
                     'XP_gain':10,
                     'item_yield':[Item('Copper Ore')],
                     'action_time':1.5
                     },
                 'Tin Ore': {
                     'lvl_requirement':1,
                     'XP_gain':10,
                     'item_yield':[Item('Tin Ore')],
                     'action_time':1.5
                 }     
                } 

metallurgy_tasks = {'Bronze Bar':
                    {'lvl_requirement':1,
                     'XP_gain':20,
                     'item_yield':1,
                     'requires':['Copper Ore', 'Tin Ore'],
                     'action_time':1.5
                     } 
                }     
class Skill:
    def __init__(self,name,tasks:dict,total_xp=0):
        self.total_xp=total_xp
        self.name=name
        self.tasks=tasks

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