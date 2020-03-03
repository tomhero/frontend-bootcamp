// Type Casting

const paragraph = document.getElementById('my-p');
console.log(paragraph);

// cast some element to HTMLInputElement type
const usernameEl = <HTMLInputElement> document.getElementById('username');
// const usernameEl = document.getElementById('username') as HTMLInputElement;
// Now you can use `value` property here
usernameEl.value = 'Hi There!!!'

const otherUsernameEl =  document.getElementById('username');

if (otherUsernameEl) {
    // So you can do this!!
    const text = (otherUsernameEl as HTMLInputElement).value
    console.log(text);
}

interface ErrorContainer { // { email: 'Invalid email', username: 'Wrong syntax' }
    // id: number; // This is not allow when use index type
    id: string;
    // Index type (string | number | symbol)
    // [propperty name]: value type
    [prop: string]: string;
}

const errorPayload: ErrorContainer = {
    id: 'e01',
    // belows are extra properties name on the fly
    email: 'Invalid email',
    username: 'Wrong syntax'
};

console.log(errorPayload);

type Combination = string | number;

// Overloading
function plus(a:number, b: number): number
function plus(a:string, b: string): string
function plus(a:number, b: string): string
function plus(a:string, b: number): string
// OMG you should Overloading with union type!!
function plus(a: Combination, b: Combination) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

console.log(plus('Chayut', ' Ruksomya'));

const fetchedUserData = {
    id: 'u1',
    name: 'Tom',
    job: {
        title: 'Jr. SE',
        fullTitle: 'Junior Software Engineer',
        // desc: 'An ordinary programmer'
    }
};

// Optional chaining
console.log(fetchedUserData?.job?.fullTitle);
console.log(fetchedUserData?.job?.desc);


