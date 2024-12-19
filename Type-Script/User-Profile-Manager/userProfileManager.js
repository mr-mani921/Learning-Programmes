"use strict";
// (Problem 2): Dynamic User Profile Updater
// Problem Statement:
// You need to design a User Profile Updater for a system that manages user information. Each user has a profile containing details like their name, age, email, and address. The system should allow the following functionalities:
// Create a New Profile:
// Each profile should have the following properties:
// id (unique).
// name (string).
// age (number).
// email (string).
// address (object with city, state, and zip).
// All properties except id should be optional during creation.
// Update an Existing Profile:
// Only allow updating specific properties dynamically (use TypeScript utility types like Partial).
// Prevent Overwriting Critical Fields:
// Ensure id cannot be updated (use Readonly for critical fields).
// Validation:
// Ensure the email format is valid.
// Ensure the age is within a reasonable range (e.g., 18–120).
// Display Profiles:
// Display a summary of all profiles in a readable format.
// Hints:
// Use Partial<T> for flexible updates.
// Use custom types and utility types to handle validation and constraints.
// Use Readonly for properties that should not change after creation.
// Think about how to validate the email and age dynamically.
var Cities;
(function (Cities) {
    Cities["Peshawar"] = "Peshawar";
    Cities["Islamabad"] = "Islamabad";
    Cities["Rawalpindi"] = "Rawalpindi";
    Cities["Lahore"] = "Lahore";
    Cities["Karachi"] = "Karachi";
    Cities["Isfahan"] = "Isfahan";
    Cities["Tabriz"] = "Tabriz";
    Cities["Tehran"] = "Tehran";
})(Cities || (Cities = {}));
var States;
(function (States) {
    States["Pakistan"] = "Pakistan";
    States["Iran"] = "Iran";
})(States || (States = {}));
var ZipCodes;
(function (ZipCodes) {
    ZipCodes["KarachZip"] = "05444";
})(ZipCodes || (ZipCodes = {}));
class UserProfile {
    constructor() {
        this.users = [];
    }
    checkExistence(key, value) {
        let index = this.users.findIndex((user) => user[key] === value);
        return index;
    }
    emailValidator(email) {
        //The following is regex(Regular Expression) used for email validation.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //text method compare a string by a regEx
        if (!email || !emailRegex.test(email)) {
            console.error("Invalid email! Please enter a valid email address." + email);
            return false;
        }
        let emailExistency = this.users.find((user) => user.email === email);
        if (emailExistency) {
            console.error('User with same email already registered');
            return false;
        }
        return true;
    }
    ageValidator(age) {
        if (age !== undefined && age >= 18 && age <= 120) {
            return true;
        }
        else {
            console.error("Your are not elidgebale for using our app");
            return false;
        }
    }
    createNewUserProfile(newUser) {
        if (newUser.id !== undefined) {
            const index = this.checkExistence("id", newUser.id);
            if (index === -1) {
                if (this.emailValidator(newUser.email) &&
                    this.ageValidator(newUser.age)) {
                    this.users.push(newUser);
                    console.log(`New user created successfully!!`);
                    console.table(newUser);
                }
            }
            else {
                console.error("user with same id already exist!");
            }
        }
    }
    updateUser(founderKey, founderKeyValue, updaterKey, updaterKeyValue) {
        if (updaterKey === "id") {
            console.error("Id is readonly and cannot be changed");
        }
        else {
            let userIndex = this.checkExistence(founderKey, founderKeyValue);
            if (userIndex !== -1) {
                this.users[userIndex][updaterKey] = updaterKeyValue;
                console.log(`Users ${updaterKey} updated successfully!`);
                console.table(this.users[userIndex]);
            }
            else {
                console.log(`No user with this ${founderKey}:${founderKeyValue} found!.\n\tYou have to register first`);
            }
        }
    }
    printSummary() {
        console.log(this.users);
        return;
    }
}
const admin = new UserProfile();
admin.createNewUserProfile({
    id: 1,
    name: "Mani Webdev",
    age: 18,
    email: "a@a.com",
    address: {
        city: Cities.Peshawar,
        state: States.Pakistan,
        zip: ZipCodes.KarachZip,
    },
});
admin.createNewUserProfile({
    id: 2,
    name: "Usman",
    age: 18,
    email: "a@a.com",
    address: {
        city: Cities.Peshawar,
        state: States.Pakistan,
        zip: ZipCodes.KarachZip,
    },
});
// admin.updateUser("id", 2, "email", "b@b.com");
// admin.updateUser("id", 2, "age", 16);
admin.printSummary();
