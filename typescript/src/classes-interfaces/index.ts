class Department {

    // private departmentId: string;
    // private name: string;
    private employees: string[] = [];

    constructor(private readonly departmentId: string, public name: string) {
        // NOTE : You can simply do this for constructor
        // this.name = name
        // this.departmentId = id
    }

    describe(needSecret: boolean) {
        if (needSecret) {
            console.log(`Departmant(${this.departmentId}) name is ${this.name} | ${this.getDepartmentSecret()}`);
        } else {
            console.log(`Departmant(${this.departmentId}) name is ${this.name}`);
        }
    }

    addEmployee(employee: string) {
        // this.departmentId = '1234' // You can not do this if it readonly 
        this.employees.push(employee)
    }

    private getDepartmentSecret() {
        return 'TopSecret!!'
    }
    
}

const myDepartment = new Department('123', 'SD');
myDepartment.addEmployee("Tom");
myDepartment.addEmployee("Maya")

myDepartment.describe(true)
myDepartment.describe(false)
