// console.log('Welcome to drag and drop app!!');

// `///` <-- this is a typscript syntax!! | use it to import namespace!!
/// <reference path="models/drag-drop.ts" />
/// <reference path="models/project-model.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

namespace App {

    const projectInput = new ProjectInput('project-input', 'app');
    const activeProjects = new ProjectList('project-list', 'app', ProjectStatus.Active);
    const achivedProjects = new ProjectList('project-list', 'app', ProjectStatus.Finished);

}
