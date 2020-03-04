function Logger(logString: string) { // This function is a decorator factory
    return (constructor: Function) => {
        console.log('logging...' + logString);
        console.log(constructor);
    }
}

function withTemplate(template: string, hookID: string) {
    // return (_: Function) => { // `_` variable means not use but decorator need at least one args | LOL
    return (constructor: any) => {
        const hookEl = document.getElementById(hookID);
        const person = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = person.name; // `hookEl.querySelector('h1')` will never null
        }
    }
}

{ // This is only block scope from JS knowledge \ no need to rousing
    @Logger('log text test') // Run when a particular class has been defined!!
    @withTemplate('<h1>Human Header!! here</h1>', 'app')
    class Human {
        name = 'Tomhero'
    
        constructor() {
            console.log('Create some human');
        }
    }
    
    const person = new Human()
    console.log(person);
}
