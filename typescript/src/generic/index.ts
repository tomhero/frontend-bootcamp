// Generic type --> `<T>`
const names: Array<string | number | boolean> = ['Tom', 'Bas', false, true, 99];

// console.log(names[0].split());

// Generic type for Promise
const myProcess: Promise<any> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done!!')
    }, 1000);
});

console.time()
myProcess.then(data => {
    console.log(data);
    console.timeEnd()
});

// Example of Generic function!!
// Now merge function can accept all object structure as args and TypeScript will reconize it!!
function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}

// You can also do this if not use generic function but is so cumbersome.
// const mergeResult = merge({name: 'Tom'}, {age: 23}) as {name: string ; age: number};
const mergeResult = merge({name: 'Tom'}, {age: 23});
const mergeResult2 = merge({name: 'Tom', favFood: 'steak'}, {beverage: 'soft drink'});
console.log(mergeResult.name);
console.log(mergeResult2.favFood);


