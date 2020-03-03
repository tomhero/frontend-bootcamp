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

class DigitalDepartment extends Department {
    admins: string[]
    constructor(id: string, admins: string[]) {
        super(id, 'Digital') // this line of code should reside here!!
        this.admins = admins
    }
}

class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting')
    }

    addReport(report: string) {
        this.reports.push(report)
    }

    printReport() {
        console.log(this.reports);
        
    }
}

const myDepartment = new Department('Dev1', 'SD');
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

accounting.addReport('mayday mayday!!')

accounting.printReport()
