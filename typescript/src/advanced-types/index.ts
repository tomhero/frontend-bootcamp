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
