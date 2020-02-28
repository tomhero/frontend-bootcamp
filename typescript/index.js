/**
 * More Functions
 */
function add(num1, num2) {
    return num1 + num2;
}
function printResult(num) {
    console.log('Result =', num);
    return; // <-- Not a good code ❌
}
printResult(add(6, 10));
var combineValues;
combineValues = add; // This refer to the add(num1: number, num2: number) function!!
combineValues = 5;
var myFunction;
console.log(combineValues(5, 6));
