// interface is a custom type!! you could say.
interface Person {
    name: string;
    age: number;

    greet(phrase: string): void
}

let villager: Person;
villager = {
    name: 'Tom',
    age: 23,
    greet(phrase: string) {
        console.log(`${phrase} - I'm ${this.name}`);
    }
}

villager.greet('Hi there')