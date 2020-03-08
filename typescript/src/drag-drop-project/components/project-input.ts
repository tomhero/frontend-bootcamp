import BaseComponent from "./base-component"; // the name is up to you because of default export
import * as validation from "../util/validation"; // alias
import { Autobind as AutoBind } from "../decorators/autobind"; // rename
import { projectState } from "../state/project-state";

export class ProjectInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
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

    @AutoBind
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

        const titleValidatable: validation.Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: validation.Validatable = {
            value: enteredDescription,
            minLength: 3,
            maxLength: 120
        }

        const peopleValidatable: validation.Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (
            !validation.validateInput(titleValidatable) ||
            !validation.validateInput(descriptionValidatable) ||
            !validation.validateInput(peopleValidatable)
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