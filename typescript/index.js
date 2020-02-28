/**
 * More Functions
 */
function add(num1, num2) {
    return num1 + num2;
}
function printResult(num) {
    console.log('Result =', num);
    return; // <-- Not a good code, because of void return type ❌
}
function addAndHandle(num1, num2, cb) {
    // function with callback
    var result = num1 + num2;
    cb(result);
}
printResult(add(6, 10));
var combineValues; // It's ok to do this
combineValues = add; // This refers to the add(num1: number, num2: number) function!!
console.log(combineValues(5, 6));
var specificAdd; // This is good to do so.
// specificAdd = printResult // <-- Thus this is mismatch with the real function
specificAdd = add; // GGEZ
console.log(specificAdd(5, 6));
addAndHandle(9, 9, function (rsNum) {
    // this refers to cb: `(rsNum: number) => void`
    console.log(rsNum);
});
