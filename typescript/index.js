/**
 * Object
 * Array
 * Tuple
 * Enum (Java like)
 * any
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
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 5] = "ADMIN";
    Role[Role["READ_ONLY"] = 6] = "READ_ONLY";
    Role["AUTHOR"] = "5000";
})(Role || (Role = {}));
var person2 = {
    name: 'Chayut',
    nickname: 'Tom',
    age: 23,
    foods: ['Steak', 'Omlet', 'Som Tum', 'Tom-Yum-Kung'],
    role: Role.AUTHOR
};
if (person2.role === Role.AUTHOR) {
    console.log('This person is admin');
}
console.log(Role.READ_ONLY);
