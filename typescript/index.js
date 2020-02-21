/**
 * Object
 * Array
 * any
 * Tuple
 * Enum (Java like)
 */
var person = {
    name: 'Chayut',
    nickname: 'Tom',
    age: 23,
    foods: ['Steak', 'Omlet', 'Som Tum', 'Tom-Yum-Kung'],
    role: [2, 'Dev']
};
// person.role[1] = 123 // ❌ you cannot do this because of tuple of [number, string]
var favFoods; // array declaration
//  favFoods = ['egg!!', 2] // ❌ you cannot do this because this array accepts string only
var anyFavFoods;
anyFavFoods = ['egg', 2, false];
for (var _i = 0, _a = person.foods; _i < _a.length; _i++) {
    var food = _a[_i];
    // TypeScript knows what is type for food variable!!
    console.log(food.toUpperCase());
}
// Enum example
var ADMIN = 0;
var READ_ONLY = 1;
var NORMAL = 2;
var person2 = {
    name: 'Chayut',
    nickname: 'Tom',
    age: 23,
    foods: ['Steak', 'Omlet', 'Som Tum', 'Tom-Yum-Kung'],
    role: ADMIN
};
if (person2.role === ADMIN) {
    console.log('This person is admin');
}
