namespace App {
    // Base component class
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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

            this.attach(insertAtStart);
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
}