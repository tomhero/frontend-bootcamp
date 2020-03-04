function Logger(logString: string) { // This function is a decorator factory (in capital case)
    console.log('Logger has been called'); // A.
    return (constructor: Function) => {
        console.log('logging...' + logString); // 2.
        console.log(constructor); // 3.
    }
}

function WithTemplate(template: string, hookID: string) {
    console.log('withTemplate has been called'); // B.
    // return (_: Function) => { // `_` variable means not use but decorator need at least one args | LOL
    return <T extends {new (...args: any[]): { name: string } }>(originalConstructor: T) => {
        return class extends originalConstructor {
            // This is a returnning of new custom class with some logic below!!
            constructor(..._args: any[]) { // `_args` means not use args variable in later
                super();
                console.log('rendering...'); // 1.
                const hookEl = document.getElementById(hookID);
                // const person = new originalConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name; // `hookEl.querySelector('h1')` will never null
                }
            }
        }
    }
}

{ // This is only block scope from JS knowledge \ no need to rousing
    // Decorator runs when a particular class has been defined!!
    @Logger('log text test') //  A. 2. 3.
    @WithTemplate('<h1>Human Header!! here</h1>', 'app') // B. 1.
    class Human {
        name: string = 'Superman'
    
        constructor() {
            console.log('Create some human');
        }
    }
    
    const person = new Human()
    console.log(person);
}

{
    /**
     * Property Decorators
     */
    function Log(target: any, PropertyName: string) {
        console.log('Property Decorators test');
        console.log(target, '\n', PropertyName);
    }

    function Log2(target: any, PropertyName: string, descriptor: PropertyDescriptor) {
        console.log('Test Accessor Decorators');
        console.log(target);
        console.log(PropertyName);
        console.log(descriptor);
    }

    function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
        console.log('Method Decorators');
        console.log(target);
        console.log(name);
        console.log(descriptor);
    }

    function Log4(target: any, name: string | Symbol, position: number) {
        console.log('Parameter Decorators');
        console.log(target);
        console.log(name);
        console.log(position);
    }
     
    class Product {
        @Log // This will this when your class definition has been registed by JS
        title: string

        constructor(title: string, private _price: number) {
            this.title = title
        }

        @Log2
        public set price(val : number) {
            if (val > 0) {
                this._price = val;
            } else {
                throw new Error('Invalid price to set');
            }
        }
        
        @Log3
        getPriceWithTax(@Log4 tax: number): number {
            return +((this._price * (1 + tax)).toFixed(2));
        }
    }

    const newProduct = new Product('Book', 42.06)
    console.log(newProduct.getPriceWithTax(0.07));

    class Printer {
        message = 'This works!!'

        showMessage() {
            console.log(this.message);
        }
    }

    const buttonEl = document.querySelector('button')! as HTMLButtonElement;
    buttonEl.addEventListener('click', (e) => {
        console.log(e);
    })

}
