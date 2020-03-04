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
// Add also if you use `extends` keyword to add Constraints to an args
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}

// You can also do this if not use generic function but is so cumbersome.
// const mergeResult = merge({name: 'Tom'}, {age: 23}) as {name: string ; age: number};
const mergeResult = merge({name: 'Tom'}, {age: 23});
const mergeResult2 = merge({name: 'Tom', favFood: 'steak'}, {beverage: 'soft drink'});
// const mergeResult3 = merge({name: 'Tom'}, 999); // you cannot do this because of `extends` keyword in function
console.log(mergeResult.name);
console.log(mergeResult2.favFood);

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): {el: T, description: string} {
    let desc = 'Got no value.';
    const elLength = element.length; // this is a valid code bacause of `extends Lengthy` keyword
    if (elLength === 1) {
        desc = 'Got one element.';
    } else if (elLength > 1) {
        desc = `Got ${elLength} elements.`;
    }
    return {el: element, description: desc}
}

console.log(countAndDescribe('qwerty'));
// You can also call it with array type!! wow §(*￣▽￣*)§
console.log(countAndDescribe(['qwerty', '123456', 999]));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    // To tell typeScript that some arg use other args's key!! --> use `keyof`
    return 'Val = ' + obj[key];
}

console.log(extractAndConvert({name: 'Tom'}, 'name'));
// console.log(extractAndConvert({name: 'Tom'}, 'age')); // You can not do this bacause of `extends keyof T`

// -- Generic Class
// `extends string | number | boolean` is a good idea to do so
class DataStorage<T extends string | number | boolean> {
    private  data: T[] = [];

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const testStorage = new DataStorage<string>();
testStorage.addItem('car')
testStorage.addItem('ipad')
testStorage.addItem('iphone')
testStorage.addItem('ipod')
testStorage.removeItem('ipad')
console.log(testStorage.getItems());

// Strong type with class dynamic arrtibute type
const numberStorage = new DataStorage<number | boolean>();

// const objectStorage = new DataStorage<object>();
// objectStorage.addItem({name: 'Tom'})
// objectStorage.addItem({name: 'Bassy'})
// // ...
// objectStorage.removeItem({name: 'Tom'})
// console.log(objectStorage.getItems()); // 🤷‍♂️

// Partial type

interface DailyGoal {
    title: string;
    desc: string;
    completeUntil: Date;
    completed: boolean
}

//. Exanple of Partial type
function createDailyGoal(
    title: string, desc: string, util: Date, completed: boolean
    ) : DailyGoal {
        let newDailyGoal: Partial<DailyGoal> = {};
        newDailyGoal.title = title;
        newDailyGoal.desc = desc;
        newDailyGoal.completeUntil = util;
        newDailyGoal.completed = completed;
        return newDailyGoal as DailyGoal;
}

// console.log(createDailyGoal({title: 'Test', desc: 'test desc', completeUntil: new Date(), completed: false}));

// Read-only type
const authors: Readonly<string[]> = ['Tom', 'Anna'];
// `Readonly` makes it immutable at once!!
// authors.push('Marina'); ❌
// authors.pop(); ❌
