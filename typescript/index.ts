/**
 * Object
 * Array
 * any
 * Tuple
 * Enum (Java like)
 */

const person: {
    name: string
    age: number
    nickname: string
    foods: string[] // array of string
    role: [number, string] // tuple 
} = {
    name: 'Chayut',
    nickname: 'Tom',
    age: 23,
    foods: ['Steak', 'Omlet', 'Som Tum', 'Tom-Yum-Kung'],
    role: [2, 'Dev']
}
// person.role[1] = 123 // ❌ you cannot do this because of tuple of [number, string]

let favFoods: string[] // array declaration
//  favFoods = ['egg!!', 2] // ❌ you cannot do this because this array accepts string only
let anyFavFoods: any[]
anyFavFoods = ['egg', 2, false]

for (const food of person.foods) {
    // TypeScript knows what is type for food variable!!
    console.log(food.toUpperCase());
}

// Enum example
const ADMIN = 0
const READ_ONLY = 1
const NORMAL = 2

const person2 = {
    name: 'Chayut',
    nickname: 'Tom',
    age: 23,
    foods: ['Steak', 'Omlet', 'Som Tum', 'Tom-Yum-Kung'],
    role: ADMIN
}

if (person2.role === ADMIN) {
    console.log('This person is admin')
}
