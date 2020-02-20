function add(a, b, showResult, resultPrefix) {
    if (resultPrefix === void 0) { resultPrefix = ''; }
    if (showResult) {
        console.log(resultPrefix + a + b);
    }
    else {
        return a + b;
    }
}
var num1 = 1;
var num2 = 2.00;
var prefix = 'Result : ';
var result = add(num1, num2, true, prefix);
