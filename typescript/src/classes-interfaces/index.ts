// interface is a custom type!! you could say.
interface Greetable {
    name: string;

    greet(phrase: string): void
}

interface Shoutable {
    bigWord: string;

    shout(): void
}

class Person implements Greetable, Shoutable {
    name: string;
    bigWord: string;

    constructor(name: string, word: string) {
        this.name = name;
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

madScientist.greet('Hi there')
madScientist.shout()