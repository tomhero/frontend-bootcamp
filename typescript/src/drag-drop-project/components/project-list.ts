import { Droppable } from '../models/drag-drop.js'
import { Autobind } from "../decorators/autobind.js";
import Component from "./base-component.js";
import { ProjectItem } from "./project-item.js";
import { Project, ProjectStatus } from "../models/project-model.js";
import { projectState } from "../state/project-state.js";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements Droppable {
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
        this.rootEl.addEventListener('dragover', this.dragOverHandler);
        this.rootEl.addEventListener('dragleave', this.dropLeaveHandler);
        this.rootEl.addEventListener('drop', this.dropHandler);

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
        this.assignedProjects?.forEach(projectItem => {
            // new ProjectItem('single-project', this.rootEl.id, projectItem); // This still work!!
            new ProjectItem('single-project', this.rootEl.querySelector('ul')!.id, projectItem);
        });
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.rootEl.querySelector('ul') as HTMLUListElement;
            listEl.classList.add('droppable');
        }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        const projecId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(
            projecId,
            this.type === ProjectStatus.Active ? ProjectStatus.Active : ProjectStatus.Finished
        );
    }

    @Autobind
    dropLeaveHandler(event: DragEvent): void {
        const listEl = this.rootEl.querySelector('ul') as HTMLUListElement;
        listEl.classList.remove('droppable');
    }

}