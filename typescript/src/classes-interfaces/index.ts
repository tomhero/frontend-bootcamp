class Department {

    name: string;

    constructor(name: string) {
        this.name = name
    }

    describe() {
        console.log(`Departmant name is ${this.name}`);
    }
}

const myDepartment = new Department("SD");

myDepartment.describe()

