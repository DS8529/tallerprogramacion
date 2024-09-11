const users = [
    { name: "Alberto", age: 22 },
    { name: "Maria", age: 15 },
    { name: "Isabella", age: 27 },
    { name: "Samuel", age: 35 },
];

function operations(users) {
    return users
        .filter(user => user.age >= 18) 
        .map(user => ({
            ...user,                        
            ageInDays: user.age * 365       
        }));
}

const result = operations(users);

console.log(result);