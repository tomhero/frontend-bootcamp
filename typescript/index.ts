/**
 * More Functions
 */

function add(num1: number, num2: number) {
    return num1 + num2;
}

function printResult(num:number): void {
    console.log('Result =', num);
    return; // <-- Not a good code ❌
}

printResult(add(6, 10));

let combineValues;
combineValues = add // This refer to the add(num1: number, num2: number) function!!
combineValues = 5

let myFunction: Function;

console.log(combineValues(5, 6))