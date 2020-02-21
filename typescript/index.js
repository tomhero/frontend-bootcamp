/**
 * Union Types --> arg1 : string | number
 * Literal Types --> arg2 : 'my custom val1' | 'mu csutom val2'
 * Type Aliases
 */
function combine(input1, input2, returnType) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || returnType === 'int') {
        result = (+input1) + (+input2);
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var combinedNum = combine(25, 50, 'int');
console.log(combinedNum);
var combinedName = combine('Tom', 'NgaiJa', 'str');
console.log(combinedName);
