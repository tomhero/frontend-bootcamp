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

class ProjectInput {
    // HTMLTemplateElement is a interface from "DOM" lib
    templateEl: HTMLTemplateElement;
    renderTargetEl: HTMLDivElement;
    rootEl: HTMLFormElement;
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor(templateElId: string, targetElId: string) {
        this.templateEl = document.getElementById(templateElId)! as HTMLTemplateElement;
        this.renderTargetEl = <HTMLDivElement>document.getElementById(targetElId)!;
        // Get document fragment (child elements)
        this.rootEl = this.templateEl.content.querySelector('form') as HTMLFormElement;

        this.titleInputEl = this.rootEl.querySelector('#title') as HTMLInputElement;
        this.descriptionInputEl = this.rootEl.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.rootEl.querySelector('#people') as HTMLInputElement;

        this.configure()
        this.render()
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            // Check if is tuple or not?
            const [title, desc, people] = userInput
            console.log(title, desc, people);
            this.clearInputs()
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
    private configure(): void {
        this.rootEl.id = 'user-input'
        this.rootEl.addEventListener('submit', this.submitHandler);
    }

    /**
     * Render templateEl into targetEl on screen
     */
    private render(): void {
        // This is not working (っ °Д °;)っ for event listener
        // this.renderTargetEl.innerHTML = this.rootEl.outerHTML
        this.renderTargetEl.insertAdjacentElement('afterbegin', this.rootEl);
    }
}

const projectInput = new ProjectInput('project-input', 'app');