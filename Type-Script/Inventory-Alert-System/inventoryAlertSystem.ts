// Problem 1: Inventory Alerts System
// Problem Statement:
// You are tasked with building a Stock Management Alert System for a store. The system should track the inventory of various items and provide alerts when an item’s stock level goes below a threshold.
 
// Requirements:
// Allow adding new items to the system with the following properties:

// Item ID (unique), Item Name, Stock Quantity, and Price per Item.
// Implement functionality to:

// Add a new item to the inventory.
// Update the stock of an existing item.
// Check if the item stock falls below a defined threshold and provide an alert (e.g., Item <name> has low stock!).
// Display a summary of all items in the inventory.
// The system should handle edge cases:

// Prevent adding duplicate items based on the Item ID.
// Ensure stock quantity cannot be negative.
// Hints:
// You can track alerts for low stock using some form of threshold logic.
// Type constraints can be used for validation.
// Consider how you would handle checking for duplicate IDs.

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

type ItemKeys = keyof Item;

class InventoryAlertSystem {
  private items: Item[] = [];

  // Check if an item exists based on any property
  checkExistence<T extends ItemKeys>(key: T, value: Item[T]): number {
    const isExist = this.items.findIndex((item) => item[key] === value);
    //the following condition occurs when the above programe doesn't find any item with the same id
    if (isExist === -1) {
      return -1; // Item not found in items array (means in the inventory)
    } else {
      //also isExist contain the index of the item so it will be usefull when we are going to update the item so we will return it too.
      return isExist; // Return the index of the item (means it is available in the inventory)
    }
  }

  // Method to add a new item to the inventory
  addItem(newItem: Item): void {
    if (this.checkExistence("id", newItem.id) === -1) {
      this.items.push(newItem);
      console.log(`New item added successfully to inventory.`);
      console.table(this.items)
    } else {
      console.log(`Failed to add new item. Duplicate ID detected.`);
    }
  }

  // Method to update an existing item in the inventory
  updateItem<T extends ItemKeys>(
    searchKey: T,
    searchValue: Item[T],
    updateProp: T,
    value: Item[T]
  ): void | Item {
    const itemIndex = this.checkExistence(searchKey, searchValue);
    if (itemIndex !== -1) {
      this.items[itemIndex][updateProp] = value; // Update the property dynamically
      console.log(`Item updated successfully!`);
      console.table(this.items[itemIndex]);
      return this.items[itemIndex]; // Return the updated item
    } else {
      console.error(`Item with ${searchKey} "${searchValue}" not found.`);
    }
  }

  // Method to check the stock quantity of an item by name
  checkStock(itemName: Item["name"]): void {
    const itemIndex = this.checkExistence("name", itemName);
    if (itemIndex !== -1) {
      let quantity = this.items[itemIndex].quantity;
      if(quantity < 10) {

        console.log(`Alert!!\n\t Stock of ${itemName} is getting low in the inventory.\nThe only available stock is ${quantity} pieces`);
      } else {      
      console.log(`Stock of "${itemName}"is enough which is : ${this.items[itemIndex].quantity} pieces`);
    }
    } else {
      console.log(`Item "${itemName}" not found in inventory.`);
    }
  }
}

let inventoryManager = new InventoryAlertSystem();

inventoryManager.addItem({
  id:1,
  name: "Fujitsu Lifebook",
  price: 25000,
  quantity: 9,
})

inventoryManager.checkStock("Fujitsu Lifebook");
inventoryManager.updateItem("name","Fujitsu Lifebook","quantity",10);
inventoryManager.checkStock("Fujitsu Lifebook");
//I gave wrong item name intentionally whcih will print and error message. 
inventoryManager.updateItem("name","Fujitsu Lifebok","quantity",10);