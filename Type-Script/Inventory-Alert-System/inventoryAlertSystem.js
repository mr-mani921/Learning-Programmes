"use strict";
// Problem 1: Inventory Alerts System
// Problem Statement:
// You are tasked with building a Stock Management Alert System for a store. The system should track the inventory of various items and provide alerts when an item’s stock level goes below a threshold.
class InventoryAlertSystem {
    constructor() {
        this.items = [];
    }
    // Check if an item exists based on any property
    checkExistence(key, value) {
        const isExist = this.items.findIndex((item) => item[key] === value);
        //the following condition occurs when the above programe doesn't find any item with the same id
        if (isExist === -1) {
            return -1; // Item not found in items array (means in the inventory)
        }
        else {
            //also isExist contain the index of the item so it will be usefull when we are going to update the item so we will return it too.
            return isExist; // Return the index of the item (means it is available in the inventory)
        }
    }
    // Method to add a new item to the inventory
    addItem(newItem) {
        if (this.checkExistence("id", newItem.id) === -1) {
            this.items.push(newItem);
            console.log(`New item added successfully to inventory.`);
            console.table(this.items);
        }
        else {
            console.log(`Failed to add new item. Duplicate ID detected.`);
        }
    }
    // Method to update an existing item in the inventory
    updateItem(searchKey, searchValue, updateProp, value) {
        const itemIndex = this.checkExistence(searchKey, searchValue);
        if (itemIndex !== -1) {
            this.items[itemIndex][updateProp] = value; // Update the property dynamically
            console.log(`Item updated successfully!`);
            console.table(this.items[itemIndex]);
            return this.items[itemIndex]; // Return the updated item
        }
        else {
            console.error(`Item with ${searchKey} "${searchValue}" not found.`);
        }
    }
    // Method to check the stock quantity of an item by name
    checkStock(itemName) {
        const itemIndex = this.checkExistence("name", itemName);
        if (itemIndex !== -1) {
            let quantity = this.items[itemIndex].quantity;
            if (quantity < 10) {
                console.log(`Alert!!\n\t Stock of ${itemName} is getting low in the inventory.\nThe only available stock is ${quantity} pieces`);
            }
            else {
                console.log(`Stock of "${itemName}"is enough which is : ${this.items[itemIndex].quantity} pieces`);
            }
        }
        else {
            console.log(`Item "${itemName}" not found in inventory.`);
        }
    }
}
let inventoryManager = new InventoryAlertSystem();
inventoryManager.addItem({
    id: 1,
    name: "Fujitsu Lifebook",
    price: 25000,
    quantity: 9,
});
inventoryManager.checkStock("Fujitsu Lifebook");
inventoryManager.updateItem("name", "Fujitsu Lifebook", "quantity", 10);
inventoryManager.checkStock("Fujitsu Lifebook");
//I gave wrong item name intentionally whcih will print and error message. 
inventoryManager.updateItem("name", "Fujitsu Lifebok", "quantity", 10);
