let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Yayayaya';

userName = 'Tom';
// userName = userInput // You can't assign a primative type into the unkown~~~~~~

// The never land??
function generateError(message: string, code: number): never {
    // This is an use case for the never type
    throw {
        message,
        errorCode: code
    };
}

const rs = generateError('Kono error da!!!', 500)
console.log(rs)