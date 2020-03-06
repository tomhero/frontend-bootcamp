// console.log('Welcome to drag and drop app!!');
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validateInput(validatableInput: Validatable): boolean {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().length !== 0;
    }
    if ( // Because if `!= null` is also include check for undefine!!
        validatableInput.minLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (
        validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max
    }
    return isValid
}

function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    // This is custom (logic) PropertyDescriptor to add
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // this refers to original caller (`ProjectInput` class for example)
            const boundFunction = originalMethod.bind(this)
            return boundFunction
        }
    };
    return adjDescriptor;
}

enum ProjectStatus {
    Active = 'active',
    Finished = 'finished',
}

// Project custom type
class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus,
    ) {
    }
}

// ------------- Function that return void!!
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

/**
 * Class for state management that reflect UI
 * with singleton pattern
 */
class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }
    
    public static getInstance() {
        if(!this.instance) {
            return new ProjectState();
        }
        return this.instance;
    }

    addListener(listener: Listener<Project>) {
        this.listeners.push(listener);
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );

        this.projects.push(newProject);
        this.listeners.forEach(listener => {
            listener(this.projects.slice());
        });
    }
}

const projectState = ProjectState.getInstance();

// Base component class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    renderTargetEl: T;
    rootEl: U;

    constructor(templateElId: string, targetElId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateEl = document.getElementById(templateElId)! as HTMLTemplateElement;
        this.renderTargetEl = <T>document.getElementById(targetElId)!;

        this.rootEl = this.templateEl.content.firstElementChild?.cloneNode(true) as U;

        if (newElementId) {
            this.rootEl.id = newElementId;
        }

        this.attach(insertAtStart)
    }

    /**
     * Attach templateEl into targetEl on screen
     */
    private attach(insertAtBeginnig: boolean): void {
        // This is not working (っ °Д °;)っ for event listener
        // this.renderTargetEl.innerHTML = this.rootEl.outerHTML
        this.renderTargetEl.insertAdjacentElement(
            insertAtBeginnig ? 'afterbegin' : 'beforeend',
            this.rootEl
        );
    }

    abstract configure(): void;
    abstract renderContent(): void;

}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects?: Project[];

    constructor(templateElId: string, targetElId: string, private type: ProjectStatus) {
        super(templateElId, targetElId, false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    /**
     * Configure an element before render
     */
    configure(): void {
        // Add projects to subcriber here
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === ProjectStatus.Active) {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProject();
        });
    }

    renderContent(): void {
        const listId = `${this.type}-project-list`;
        this.rootEl.querySelector('ul')!.id = listId;
        this.rootEl.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    renderProject(): void {
        const listEl = document.getElementById(`${this.type}-project-list`) as HTMLUListElement;
        listEl.innerHTML = '';
        this.assignedProjects?.forEach(prjectItem => {
            const listItemEl = document.createElement('li');
            listItemEl.textContent = prjectItem.title;
            listEl?.appendChild(listItemEl);
        });
    }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    // HTMLTemplateElement is a interface from "DOM" lib
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor(templateElId: string, targetElId: string) {
        super(templateElId, targetElId, true, 'user-input');

        this.titleInputEl = this.rootEl.querySelector('#title') as HTMLInputElement;
        this.descriptionInputEl = this.rootEl.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.rootEl.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            // Check if is tuple or not?
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }

    private clearInputs() {
        this.titleInputEl.value = ''
        this.descriptionInputEl.value = ''
        this.peopleInputEl.value = ''
    }

    // use tuple | undefined type here bacause of code path is not sure that it return or not!!
    private gatherUserInput(): [string, string, number] | undefined {
        const enteredTitle = this.titleInputEl.value
        const enteredDescription = this.descriptionInputEl.value
        const enteredPeople = this.peopleInputEl.value

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            minLength: 3,
            maxLength: 120
        }

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (
            !validateInput(titleValidatable) ||
            !validateInput(descriptionValidatable) ||
            !validateInput(peopleValidatable)
        ) {
            alert('Invalid input found');
            return;
        } else {
            return [
                enteredTitle,
                enteredDescription,
                +enteredPeople
            ]
        }
    }

    /**
     * Configure an element before render
     */
    configure(): void {
        this.rootEl.addEventListener('submit', this.submitHandler);
    }

    renderContent(): void {
        throw new Error("Method not implemented.");
    }

}

const projectInput = new ProjectInput('project-input', 'app');
const activeProjects = new ProjectList('project-list', 'app', ProjectStatus.Active);
const achivedProjects = new ProjectList('project-list', 'app', ProjectStatus.Finished);
