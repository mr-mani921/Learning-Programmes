interface user {
  id: number;
  name: string;
  email: string;
}
const user = [
  { id: 1, name: "mani", email: "a@a.com" },
  { id: 2, name: "Professor", email: "b@b.com" },
  { id: 3, name: "Yasso", email: "c@c.com" },
];
function greetUser(obj: user) {
  console.log(`Hello ${obj.name}!`);
}
user.forEach(item => {
    greetUser(item)
});
