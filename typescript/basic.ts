/**
 * Basic Type
 */

function add(a: number, b: number, showResult: boolean, resultPrefix: string = '') {
    if (showResult) {
        console.log(resultPrefix + (a + b))
    } else {
        return a + b
    }
}

let num1: number
num1 = 5
const num2 = 2.00
let prefix: string
prefix = 'Result : '

const result = add(num1, num2, true, prefix)

