// type AddFn = (a: number, b: number) => number;
interface AddFn {
    // anonymous function like above ^^^^
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2
}

console.log(add(1, 2));


// interface is a custom type!! you could say.
interface Named {
    readonly name: string; // you can add readonly within an interface
    displayName?: string; // <-- optional
}

interface Greetable extends Named {
    greet(phrase: string): void
}

interface Shoutable {
    bigWord?: string;

    shout(): void
}

class Person implements Greetable, Shoutable {
    name: string;
    bigWord?: string;

    constructor(pName: string, word?: string) {
        this.name = pName;
        if (word) {
            this.bigWord = word
        }
    }

    greet(phrase: string): void {
        console.log(phrase + ' my name is ' + this.name);
    }
    
    shout(): void {
        if (this.bigWord) { 
            console.log(this.bigWord + '!!!!!!!!!!!!!!!!!!!');
        } else {
            console.log('Ughh!!');
        }
    }
}

let madScientist: Person;
madScientist = new Person('Rintaro', 'El Psy Congroo')

// madScientist.name = '1' // you can not do this if the interface is readonly

madScientist.greet('Hi there')
madScientist.shout()