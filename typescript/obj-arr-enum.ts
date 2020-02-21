/**
 * Object
 * Array
 * Tuple
 * Enum (Java like)
 * any
 */

const person: {
    name: string;
    age: number;
    nickname: string;
    foods: string[]; // array of string
    role: [number, string]; // tuple 
} = {
    name: 'Chayut',
    nickname: 'Tom',
    age: 23,
    foods: ['Steak', 'Omlet', 'Som Tum', 'Tom-Yum-Kung'],
    role: [2, 'Dev']
};
// person.role[1] = 123 // ❌ you cannot do this because of tuple of [number, string]

let favFoods: string[]; // array declaration
//  favFoods = ['egg!!', 2] // ❌ you cannot do this because this array accepts string only
let anyFavFoods: any[]; // Please avoid this any type whenever as posible
anyFavFoods = ['egg', 2, false];

for (const food of person.foods) {
    // TypeScript knows what is type for food variable!!
    console.log(food.toUpperCase());
}

// Enum example
enum Role {
    ADMIN = 5,
    READ_ONLY, // secound value will auto increment from value before itself
    AUTHOR = '5000'
}

const person2 = {
    name: 'Chayut',
    nickname: 'Tom',
    age: 23,
    foods: ['Steak', 'Omlet', 'Som Tum', 'Tom-Yum-Kung'],
    role: Role.AUTHOR
};

if (person2.role === Role.AUTHOR) {
    console.log('This person is admin');
}

console.log(Role.READ_ONLY)
