"use strict";
// /*
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
