class Skill:
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