function Logger(constructor: Function) {
    console.log('logging...');
    console.log(constructor);
}

{
    @Logger // Run when a particular class has been defined!!
    class Human {
        name = 'Tom'
    
        constructor() {
            console.log('Create some human');
        }
    }
    
    // const person = new Human()
    // console.log(person);
}
