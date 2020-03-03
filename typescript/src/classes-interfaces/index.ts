// type AddFn = (a: number, b: number) => number;
interface AddFn {
    // anonymous function like above ^^^^
    (a: number, b: number): number;
}

// interface is a custom type!! you could say.
interface Named {
    readonly name: string; // you can add readonly within an interface
}

interface Greetable extends Named {
    greet(phrase: string): void
}

interface Shoutable {
    bigWord: string;

    shout(): void
}

class Person implements Greetable, Shoutable {
    name: string;
    bigWord: string;

    constructor(pName: string, word: string) {
        this.name = pName;
        this.bigWord = word
    }

    greet(phrase: string): void {
        console.log(phrase + ' my name is ' + this.name);
    }
    
    shout(): void {
        console.log(this.bigWord + '!!!!!!!!!!!!!!!!!!!');
    }
}

let madScientist: Person;
madScientist = new Person('Rintaro', 'El Psy Congroo')

// madScientist.name = '1' // you can not do this if the interface is readonly

madScientist.greet('Hi there')
madScientist.shout()