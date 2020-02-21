/**
 * Union Types
 * Literal Types
 * Type Aliases
 */
function combine(input1, input2) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var combinedNum = combine(25, 50);
console.log(combinedNum);
var combinedName = combine('Tom', 'NgaiJa');
console.log(combinedName);
