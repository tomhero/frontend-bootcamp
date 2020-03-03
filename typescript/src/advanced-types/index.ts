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
type ElevatedEmployee = Admin & Employee

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
