// console.log('Welcome to drag and drop app!!');
import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";
import { ProjectStatus } from "./models/project-model.js";
// `///` <-- this is a typscript syntax!! | use it to import namespace!!
/// <reference path="models/drag-drop.ts" /> |

const projectInput = new ProjectInput('project-input', 'app');
const activeProjects = new ProjectList('project-list', 'app', ProjectStatus.Active);
const achivedProjects = new ProjectList('project-list', 'app', ProjectStatus.Finished);
