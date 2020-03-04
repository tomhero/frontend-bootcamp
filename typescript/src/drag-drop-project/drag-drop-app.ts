// console.log('Welcome to drag and drop app!!');

class ProjectInput {
    // HTMLTemplateElement is a interface from "DOM" lib
    templateEl: HTMLTemplateElement;
    renderTargetEl: HTMLDivElement;

    constructor(templateElId: string, targetElId: string) {
        this.templateEl = document.getElementById(templateElId)! as HTMLTemplateElement;
        this.renderTargetEl = <HTMLDivElement>document.getElementById(targetElId)!;
        this.render()
    }

    /**
     * render targetEl to screen
     */
    private render(): void {
        // Get document fragment (child elements)
        const elementsToRender = this.templateEl.content.querySelector('form')! as HTMLFormElement;
        this.renderTargetEl.innerHTML = elementsToRender.outerHTML
    }
}

const projectInput = new ProjectInput('project-input', 'app');