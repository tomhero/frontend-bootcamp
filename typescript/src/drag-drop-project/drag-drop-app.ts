// console.log('Welcome to drag and drop app!!');

class ProjectInput {
    // HTMLTemplateElement is a interface from "DOM" lib
    templateEl: HTMLTemplateElement;
    renderTargetEl: HTMLDivElement;
    el: HTMLFormElement;

    constructor(templateElId: string, targetElId: string) {
        this.templateEl = document.getElementById(templateElId)! as HTMLTemplateElement;
        this.renderTargetEl = <HTMLDivElement>document.getElementById(targetElId)!;
        // Get document fragment (child elements)
        this.el = this.templateEl.content.querySelector('form')! as HTMLFormElement;
        this.configure()
        this.render()
    }

    /**
     * Configure an element before render
     */
    private configure(): void {
        this.el.id = 'user-input'
    }

    /**
     * Render targetEl to screen
     */
    private render(): void {
        this.renderTargetEl.innerHTML = this.el.outerHTML
    }
}

const projectInput = new ProjectInput('project-input', 'app');