namespace App {
    // ------------- Function that return void!!
    export type Listener<T> = (items: T[]) => void;

    export class State<T> {
        protected listeners: Listener<T>[] = [];

        addListener(listener: Listener<T>) {
            this.listeners.push(listener);
        }
    }

    /**
     * Class for state management that reflect UI
     * with singleton pattern
     */
    export class ProjectState extends State<Project> {
        private projects: Project[] = [];
        private static instance: ProjectState;

        private constructor() {
            super();
        }

        public static getInstance() {
            if (!this.instance) {
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
            this.updateListeners();
        }

        moveProject(projectId: string, newStatus: ProjectStatus) {
            const movingProject = this.projects.find(project => project.id === projectId);
            if (movingProject && movingProject.status !== newStatus) {
                movingProject.status = newStatus;
                this.updateListeners()
            }
        }

        private updateListeners() {
            this.listeners.forEach(listener => {
                listener(this.projects.slice());
            });
        }
    }

    export const projectState = ProjectState.getInstance();
}