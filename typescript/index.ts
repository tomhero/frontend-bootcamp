/**
 * Object
 * Array
 * any
 * Tuple
 */

 const person: {
     name: string
     age: number
     nickname: string
     foods: ['Steak', 'Omlet'] // array
 } = {
     name: 'Chayut',
     nickname: 'Tom',
     age: 23,
     foods: undefined
 }

 let favFoods: string[] // array declaration
//  favFoods = ['egg!!', 2] // ❌ you cannot do this
let anyFavFoods: any[]
anyFavFoods = ['egg', 2, false]

 console.log(person.nickname);
 