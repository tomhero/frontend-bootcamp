/**
 * Union Types --> arg1 : string | number
 * Literal Types --> arg2 : 'my custom val1' | 'mu csutom val2'
 * Type Aliases --> `type` keyword
 */

 // Now `Combinable` is a Type Aliases for the Union Types --> number | string
 type Combinable = number | string;
 // Now `ConversionDescriptor` is a Type Aliases for the Literal Types --> 'str' | 'int'
 type ConversionDescriptor = 'str' | 'int'

function combine(
    input1: Combinable, input2: Combinable, returnType: ConversionDescriptor) {
    let result: string | number;
    if (typeof input1 === 'number' && typeof input2 === 'number' || returnType === 'int') {
        result = (+input1) + (+input2);
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combinedNum = combine(25, 50, 'int');
console.log(combinedNum);

const combinedName = combine('Tom', 'NgaiJa', 'str');
console.log(combinedName);