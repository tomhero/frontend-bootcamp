class Department {

    private name: string;
    private employees: string[] = [];

    constructor(name: string) {
        this.name = name
    }

    describe(needSecret: boolean) {
        if (needSecret) {
            console.log(`Departmant name is ${this.name} | ${this.getDepartmentSecret()}`);
        } else {
            console.log(`Departmant name is ${this.name}`);
        }
    }

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    private getDepartmentSecret() {
        return 'TopSecret!!'
    }
    
}

const myDepartment = new Department("SD");
myDepartment.addEmployee("Tom");
myDepartment.addEmployee("Maya")

myDepartment.describe(true)
myDepartment.describe(false)
