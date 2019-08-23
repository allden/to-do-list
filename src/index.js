import * as DOM from './dom.js';
let domObj = DOM.domBox();
let projHolder = [];

const funcBox = () => {
    // pushes a  list item into the project with a given name
    const createProject = (projectName) => {
        projHolder.push([projectName]);
        domObj.appendToProjList(projectName);
        setEvents();
    }
    
    // pushes an object based on the location
    const createTask = (location='default', title, description, dueDate, priority) => {
        for(let i = 0; i < projHolder.length; i++) {
            if(projHolder[i].indexOf(location) >= 0) {
                projHolder[i].push({ title, description, dueDate, priority });
                return;
            } else if (i === projHolder.length - 1 && projHolder[i].indexOf(location) === -1) {
                console.log('Project not found, storing in default...');
                projHolder[0].push({ title, description, dueDate, priority });
            }
        }
    }

    const setEvents = () => {
        let projListItems = document.getElementsByClassName('project-name');
        for(let i = 0; i < projListItems.length; i++) {
            projListItems[i].addEventListener('click', showAttributes);
        }
    }

    const showAttributes = (e) => {
        domObj.clearTaskList();
        for(let i = 0; i < projHolder.length; i++) {
            if(projHolder[i][0] === e.target.textContent) {
                for(let j = 1; j < projHolder[i].length; j++) {
                    domObj.appendToTaskList(projHolder[i][j].title, projHolder[i][j].description, projHolder[i][j].dueDate, projHolder[i][j].priority )
                }
            }
        }
    }

    return { createTask, createProject }
}

let myFuncs = funcBox();
myFuncs.createProject('default');
myFuncs.createProject('cats');
myFuncs.createProject('dogs');
myFuncs.createProject('squids');

myFuncs.createTask('cats', 'feed the cats', 'don\'t forget to feed the cats!', 'yeet', 'high');
myFuncs.createTask('cats', 'feed the cats', 'don\'t forget to feed the cats!', 'yeet', 'high');
myFuncs.createTask('cats', 'feed the cats', 'don\'t forget to feed the cats!', 'yeet', 'high');
myFuncs.createTask('dogs', 'feed the dogs', 'don\'t forget to feed the dogs!', 'yeet', 'high');
myFuncs.createTask('squids', 'feed the squid', 'don\'t forget to feed the squid!', 'yeet', 'high');
console.log(projHolder);