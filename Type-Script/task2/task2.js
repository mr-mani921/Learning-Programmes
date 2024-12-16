"use strict";
/*

Task 2: Working with Optional and Readonly Properties

1. Update the User interface so that the email property is optional (email?: string) and the id property is readonly (readonly id: number).
2. Create a function updateUserEmail that takes a User object and a new email string, and returns a new User object with the updated email.
3. Add a User object to the user array and demonstrate updating the email using the updateUserEmail function. Try updating the id property and show that it's not allowed.

*/
const users = [
    { id: 1, name: "mani", email: "a@a.com" },
    { id: 2, name: "Professor", email: "b@b.com" },
    { id: 3, name: "Yasso", email: "c@c.com" },
];
function greetUser(obj) {
    console.log(`Hello ${obj.name}!`);
}
users.forEach((item) => {
    greetUser(item);
});
function updateUser(id, email) {
    const user = users.find((user) => user.id === id);
    if (user) {
        user.email = email;
        console.log(user);
        // Attempting to modify readonly 'id' would cause an error, so remove this line:
        // user.id = 2; <-- This is not allowed and should be avoided.
        return user;
    }
    else {
        console.log(`404, user with this email: ${email} not found`);
        return undefined;
    }
}
updateUser(3, "d@d.com");
