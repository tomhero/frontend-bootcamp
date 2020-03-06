/// <reference path="base-component.ts" />

namespace App {
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

        private project: Project;

        get persons(): string {
            if (this.project.people === 1) {
                return 'one person'
            } else {
                return `${this.project.people} persons`
            }
        }

        constructor(templateElId: string, targetElId: string, project: Project) {
            super(templateElId, targetElId, false, project.id);
            this.project = project;

            this.configure();
            this.renderContent();
        }

        @Autobind
        configure(): void {
            this.rootEl.draggable = true;
            this.rootEl.addEventListener('dragstart', this.dragStartHandler);
            this.rootEl.addEventListener('dragend', this.dragEndHandler);
        }

        @Autobind
        renderContent(): void {
            this.rootEl.querySelector('h2')!.textContent = this.project.title;
            this.rootEl.querySelector('h3')!.textContent = this.persons; // Use getter
            this.rootEl.querySelector('p')!.textContent = this.project.description;
        }

        @Autobind
        dragStartHandler(event: DragEvent): void {
            console.log('start dragging');
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'mone';

        }
        dragEndHandler(event: DragEvent): void {
            console.log('drag ending');
        }

    }
}