class Department {

    name: string;
    employees: string[] = [];

    constructor(name: string) {
        this.name = name
    }

    describe() {
        console.log(`Departmant name is ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee)
    }
    
}

const myDepartment = new Department("SD");
myDepartment.addEmployee("Tom")

myDepartment.describe()


