function add(a: number, b: number, showResult: boolean, resultPrefix: string = '') {
    if (showResult) {
        console.log(resultPrefix + (a + b))
    } else {
        return a + b
    }
}

const num1 = 1
const num2 = 2.00
const prefix = 'Result : '

const result = add(num1, num2, true, prefix)

