function Logger(logString: string) { // This function is a decorator factory
    console.log('Logger has been called'); // A.
    return (constructor: Function) => {
        console.log('logging...' + logString); // 2.
        console.log(constructor); // 3.
    }
}

function withTemplate(template: string, hookID: string) {
    console.log('withTemplate has been called'); // B.
    // return (_: Function) => { // `_` variable means not use but decorator need at least one args | LOL
    return (constructor: any) => {
        console.log('rendering...'); // 1.
        const hookEl = document.getElementById(hookID);
        const person = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = person.name; // `hookEl.querySelector('h1')` will never null
        }
    }
}

{ // This is only block scope from JS knowledge \ no need to rousing
    // Decorator runs when a particular class has been defined!!
    @Logger('log text test') //  A. 2. 3.
    @withTemplate('<h1>Human Header!! here</h1>', 'app') // B. 1.
    class Human {
        name = 'Tomhero'
    
        constructor() {
            console.log('Create some human');
        }
    }
    
    const person = new Human()
    console.log(person);
}
