// Intersection type (To combine types)

type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

// To combine types
type ElevatedEmployee = Admin & Employee;

const employee1: ElevatedEmployee = {
    name: 'Tom',
    privileges: ['Turn on the computer'],
    startDate: new Date()
};

// example of Intersection type
type Cominable = string | number;
type Numeric = number | boolean;

// 👍
type Universal = Cominable & Numeric;

function addition(a:Combinable, b: Combinable) {
    // This is type Guards
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

console.log(addition('10', '10'));


type UnkownEmployee = Employee | Admin

function printEmployeeInfo(emp: UnkownEmployee) {
    console.log('Name: ' + emp.name)
    // console.log('Privileges: ' + emp.privileges) // This is not working

    if ('privileges' in emp) {
        // Wow you can use `in` keyword ti check if propertie is existing?
        console.log('Privileges: ' + emp.privileges)
    }
}

printEmployeeInfo(employee1)

class Car {
    constructor() {
    }

    drive() {
        console.log('The car is driving...');
    }
}

class Truck {
    constructor() {
    }

    drive() {
        console.log('The truck is driving...');
    }

    loadCargo(amount: number) {
        console.log('Load cargo...' + amount);
    }
}

type Vehicle = Car | Truck

const modelv1 = new Car()
const modelv2 = new Truck()

function useVehicle(vehicle: Vehicle) {
    vehicle.drive()
    if (vehicle instanceof Truck) {
        // NOTE: This is a good example of type Guards !!
        // `instanceof` can be used with class only
        vehicle.loadCargo(9999)
    }
}

useVehicle(modelv1)
useVehicle(modelv2)

interface Bird {
    type: 'bird'; // common property
    flyingSpeed: number;
}

interface Horse {
    type: 'horse'; // common property
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        // 100% type safe
        case 'bird':
            speed = animal.flyingSpeed
            break;
        case 'horse':
            speed = animal.runningSpeed
            break;
    }
    console.log('Moving with in speed...' + speed);
}

moveAnimal({
    type: 'horse',
    runningSpeed: 99
})