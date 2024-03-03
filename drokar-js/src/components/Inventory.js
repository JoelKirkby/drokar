import '../App.css'
import InventoryItem from './InventoryItem';

const DUMMY_INVENTORY = [
    {
        name: "Copper Ore",
        quantity: 2
    },
    {
        name: "Tin Ore",
        quantity: 2
    }, 
    {
        name: "Copper Ore",
        quantity: 10
    } 
]

// #TO DO - Searching inventory to update items
// const inventory = [
//     { name: "apples", quantity: 2 },
//     { name: "bananas", quantity: 0 },
//     { name: "cherries", quantity: 5 },
//   ];
  
//   function isCherries(fruit) {
//     return fruit.name === "cherries";
//   }
  
//   console.log(inventory.find(isCherries));
//   // { name: 'cherries', quantity: 5 }
  
function Inventory() {
    return (
      <div className="Inventory">
        Inventory
        <div className="inventoryActionButtons">
            <button className="sellButton"> Sell </button>
        </div>
        <div className="tabsGold">
            <div className="tabs">
                Tabs
            </div>
            <div className="currency">
                0gp
            </div>
        </div>
        <div className="itemZone">
            <div className="inventoryGrid">
                {DUMMY_INVENTORY.map(item =>
                    <InventoryItem item={item.name} quantity={item.quantity}/>
                )}
            </div>
            <div className="equippedWindow">EquippedWindow</div>
        </div>
      </div>
    );
  }
  
  export default Inventory;