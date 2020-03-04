function Logger(logString: string) {
    return (constructor: Function) => {
        console.log('logging...' + logString);
        console.log(constructor);
    }
}

{
    @Logger('log text test') // Run when a particular class has been defined!!
    class Human {
        name = 'Tom'
    
        constructor() {
            console.log('Create some human');
        }
    }
    
    // const person = new Human()
    // console.log(person);
}
