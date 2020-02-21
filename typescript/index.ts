/**
 * Union Types
 * Literal Types
 * Type Aliases
 */

function combine(input1: string | number, input2: string | number) {
    let result: string | number;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    } else {
        result = input1.toString() + input2.toString()
    }
    return result;
}

const combinedNum = combine(25, 50)
console.log(combinedNum);

const combinedName = combine('Tom', 'NgaiJa');
console.log(combinedName);