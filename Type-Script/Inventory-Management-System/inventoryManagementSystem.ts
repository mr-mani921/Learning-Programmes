// Task 4: Inventory Management System
// Enum: Define an enum for item categories:

// ELECTRONICS
// GROCERY
// CLOTHING
// Interface: Define an Item interface with the following properties:

// id: number (unique identifier for each item)
// name: string
// category: ItemCategory (enum)
// quantity: number
// price: number
// Class: Create an InventoryManager class with the following functionality:

// Add Items: A method to add a new item. If the item already exists (based on id), log a message and skip adding.

// Update Quantity: A method to update the quantity of an item by id.

// If the item doesn't exist, log a message saying the item was not found.
// Get Items by Category: A method that returns all items belonging to a specific category.

// Calculate Total Inventory Value: A method to calculate the total value of all items in the inventory:
// Formula → totalValue = sum of (quantity * price) for all items.

// Implementation:

// Add at least 5 items to the inventory (a mix of electronics, grocery, and clothing items).
// Update the quantity of an item.
// Display all items from a specific category (e.g., ELECTRONICS).
// Display the total inventory value.

enum ItemCategories {
  ELECTRONICS = "ELECTRONICS",
  GROCERY = "GROCERY",
  CLOTHING = "CLOTHING",
}

interface Item {
  id: number;
  name: string;
  category: ItemCategories;
  quantity: number;
  price: number;
}

class InventoryManager {
  private items: Item[] = [];
  checkExistence(itemId: Item["id"]): number {
    let existingItemIndex = this.items.findIndex((item) => item.id === itemId);
    if (existingItemIndex !== -1) {
      return existingItemIndex;
    } else {
      return -1;
    }
  }
  addItem(itemId: Item["id"], newItem: Item): Item | void {
    if (this.checkExistence(itemId) !== -1) {
      console.log(`Item already exists in Inventory`);
      return;
    }
    this.items.push(newItem);
    console.log(`Item added successfully.`);
  }

  updateQuantity(itemId: Item["id"], updatedQuantity: Item["quantity"]): Item | void {
    let toUpdateItemIndex: number = this.checkExistence(itemId);
    if (toUpdateItemIndex !== -1) {
      let upadatedItem = (this.items[toUpdateItemIndex].quantity =
        updatedQuantity);
      console.log(`The item's quantity is updated successfully!`);

      console.table(this.items[toUpdateItemIndex]);
    }
  }

  calculateTotalValue(): void {
    if (this.items.length === 0) {
      console.log("No items available in the inventory.");
      return;
    }
    let value: number = 0;
    this.items.forEach((item) => {
      value += item.quantity * item.price;
    });
    console.log(`The total value of the available stock is: ${value}`);
  }

  filterItemsByCategory(category: Item["category"]): void {
    const categorizedItems = this.items.filter((item) => item.category === category);
    console.log(
      `${category} items available in our inventory are given below:`
    );
    console.table(categorizedItems);
  }
}

let manager = new InventoryManager();

manager.addItem(1, {
  id: 1,
  name: "Socks",
  category: ItemCategories.CLOTHING,
  quantity: 4,
  price: 20,
});

manager.addItem(2, {
  id: 2,
  name: "Jacket",
  category: ItemCategories.CLOTHING,
  quantity: 10,
  price: 800,
});
manager.addItem(3, {
  id: 3,
  name: "Hoodie",
  category: ItemCategories.CLOTHING,
  quantity: 5,
  price: 700,
});
manager.addItem(4, {
  id: 4,
  name: "VGA to HDMI converter",
  category: ItemCategories.ELECTRONICS,
  quantity: 4,
  price: 200,
});
manager.addItem(5, {
  id: 5,
  name: "Raw vegetables",
  category: ItemCategories.GROCERY,
  quantity: 2,
  price: 50,
});

manager.filterItemsByCategory(ItemCategories.CLOTHING);
manager.filterItemsByCategory(ItemCategories.ELECTRONICS);
manager.filterItemsByCategory(ItemCategories.GROCERY);

// manager.updateQuantity(4, 3);

manager.calculateTotalValue();
