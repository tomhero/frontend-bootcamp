abstract class Department {
    static fisicalYear = 2020;
    // private departmentId: string;
    // private name: string;
    protected employees: string[] = [];

    constructor(protected readonly departmentId: string, public name: string) {
        // NOTE : You can simply do this for constructor
        // this.name = name
        // this.departmentId = id
    }

    abstract describe(needSecret: boolean): void

    static createEmployee(name: string) {
        return {
            name,
            department: 'unknow'
        }
    }

    addEmployee(employee: string) {
        // this.departmentId = '1234' // You can not do this if it readonly 
        this.employees.push(employee)
    }

    getEmployee(): string[] {
        return this.employees
    }

    protected getDepartmentSecret() {
        return 'TopSecret!!'
    }
    
}

class DigitalDepartment extends Department {
    admins: string[]
    constructor(id: string, admins: string[]) {
        super(id, 'Digital') // this line of code should reside here!!
        this.admins = admins
    }

    describe(needSecret: boolean) {
        if (needSecret) {
            console.log(`DigitalDepartment(${this.departmentId}) name is ${this.name} | ${this.getDepartmentSecret()}`);
        } else {
            console.log(`DigitalDepartment(${this.departmentId}) name is ${this.name}`);
        }
    }
}

class ITDepartment extends Department {

    describe(needSecret: boolean) {
        if (needSecret) {
            console.log(`ITDepartment(${this.departmentId}) name is ${this.name} | ${this.getDepartmentSecret()}`);
        } else {
            console.log(`ITDepartment(${this.departmentId}) name is ${this.name}`);
        }
    }

}

class AccountingDepartment extends Department {
    private lastReport!: string;

    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting')
    }

    // Getter method (Encapculation)
    public get mostRecentReport() : string {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report founded.');
    }

    // Setter method
    public set mostRecentReport(value: string) {
        this.addReport(value)
    }
    
    addEmployee(name: string) {
        // @override
        if (name.length < 5) return;
        this.employees.push(name)
    }

    addReport(report: string) {
        this.reports.push(report)
        this.lastReport = report
    }

    printReport() {
        console.log(this.reports);
    }

    describe(needSecret: boolean) {
        if (needSecret) {
            console.log(`AccountingDepartment(${this.departmentId}) name is ${this.name} | ${this.getDepartmentSecret()}`);
        } else {
            console.log(`AccountingDepartment(${this.departmentId}) name is ${this.name}`);
        }
    }
}

// static method
console.log(Math.PI);
console.log(Department.fisicalYear);

const emp1 = Department.createEmployee('June')
console.log(emp1);


const myDepartment = new ITDepartment('Dev1', 'SD');
myDepartment.addEmployee("Tom");
myDepartment.addEmployee("Maya")

myDepartment.describe(true)
myDepartment.describe(false)

const preSellDept = new DigitalDepartment('Dig1', [
    'B1',
    'B2'
]);

console.log(preSellDept.admins);

const accounting = new AccountingDepartment('ac1', [])

accounting.addEmployee('Arisa')
console.log(accounting.getEmployee());

accounting.addReport('mayday mayday!!')
accounting.printReport()

// using getter
console.log(accounting.mostRecentReport);

// using setter
accounting.mostRecentReport = 'nowadays!!'
console.log(accounting.mostRecentReport);

