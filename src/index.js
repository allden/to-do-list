import * as DOM from './dom.js';
let domObj = DOM.domBox();
let initialValue = [['default', {title:'Press "Display" To See Details', description:'The "+" next to "Project List" adds a project, the "+" next to "Task List" adds a task. If you want to delete a project or a task, press the "x" or "delete" buttons.', dueDate:'N/A', priority:'High'}]];
let projHolder = initialValue;
let lastClicked = 'default';

const funcBox = () => {
    let taskPromptBtn = document.querySelector('.show-task-prompt');
    let taskPromptWindow = document.querySelector('.task-prompt');
    let taskForm = document.querySelector('.task-form');
    let newProjectBtn = document.querySelector('.new-project');
    let projectPromptWindow = document.querySelector('.project-prompt');
    let projectForm = document.querySelector('.project-form');
    let projListItems = document.getElementsByClassName('project-name');
    
    // pushes a  list item into the project with a given name
    const createProject = (projectName) => {
        projHolder.push([projectName.toLowerCase()]);
        makeProjectInStorage(projectName);
        showProjects();
    }
    
    // pushes an object based on the location
    const createTask = (location='default', title, description, dueDate, priority) => {
        for(let i = 0; i < projHolder.length; i++) {
            if(projHolder[i].indexOf(location) >= 0) {
                projHolder[i].push({ title, description, dueDate, priority });
                makeTaskInStorage(location, title, description, dueDate, priority);
            } else if (i === projHolder.length - 1 && projHolder[i].indexOf(location) === -1) {                
                projHolder[0].push({ title, description, dueDate, priority });
                makeTaskInStorage(location, title, description, dueDate, priority);
            }
        }
    }

    const checkLocalStorage = () => {
        if(!(localStorage.getItem('projHolder'))) {
            localStorage.setItem('projHolder', JSON.stringify(initialValue));
        }
    }

    const makeProjectInStorage = (name) => {
        checkLocalStorage();
        let storageProjHolder = JSON.parse(localStorage.getItem('projHolder'));
        storageProjHolder.push([name.toLowerCase()]);
        localStorage.setItem('projHolder', JSON.stringify(storageProjHolder));
    }

    const makeTaskInStorage = (location='default', title, description, dueDate, priority) => {
        checkLocalStorage();
        let storageProjHolder = JSON.parse(localStorage.getItem('projHolder'));
        for(let i = 0; i < storageProjHolder.length; i++) {
            if(storageProjHolder[i].indexOf(location) >= 0) {
                storageProjHolder[i].push({ title, description, dueDate, priority });
                localStorage.setItem('projHolder', JSON.stringify(storageProjHolder));
            } else if (i === storageProjHolder.length - 1 && storageProjHolder[i].indexOf(location) === -1) {                
                storageProjHolder[0].push({ title, description, dueDate, priority });
                localStorage.setItem('projHolder', JSON.stringify(storageProjHolder));
            }
        }
    }

    // add the events for showAttr based on a list of the 'project-name' classes
    const showAttrEvent = () => {
        for(let i = 0; i < projListItems.length; i++) {
            projListItems[i].addEventListener('click', showAttributes);
        }
    }

    // clears the task list each time it's run so that we don't have tasks from different projects contaminating the ui
    // afterwards iterates over projHolder and compares the first value to the textContent of the button
    // if it matches it runs appendToTaskList to append the values to the innerHTML of the ul
    const showAttributes = (e) => {
        domObj.clearTaskList();
        setCurrentBtn(e);
        lastClicked = e.target.childNodes[0].textContent;
        
        for(let i = 0; i < projHolder.length; i++) {
            if(projHolder[i][0] === lastClicked) {
                for(let j = 1; j < projHolder[i].length; j++) {
                    domObj.appendToTaskList(projHolder[i][j].title, projHolder[i][j].description, projHolder[i][j].dueDate, projHolder[i][j].priority )
                }
            }
        }
        removeFirstDelete();
        deleteTaskEvent();
        domObj.displayDetailsEvent();
    }

    const setCurrentBtn = (e) => {
        for(let i = 0; i < projListItems.length; i++) {
            projListItems[i].classList.remove('current');
            projListItems[i].childNodes[1].classList.remove('button-primary');
        }
        if(e.target.childNodes[1]) {
            e.target.classList.add('current');
            e.target.childNodes[1].classList.add('button-primary');
        }
    }

    const loadAttributes = () => {
        domObj.clearTaskList();
        lastClicked = 'default';
        for(let i = 0; i < projHolder.length; i++) {
            if(projHolder[i][0] === lastClicked) {
                for(let j = 1; j < projHolder[i].length; j++) {
                    domObj.appendToTaskList(projHolder[i][j].title, projHolder[i][j].description, projHolder[i][j].dueDate, projHolder[i][j].priority )
                }
            }
        }
        deleteTaskEvent();
        domObj.displayDetailsEvent();
    }

    const showProjects = () => {
        domObj.clearProjList();
        for(let i = 0; i < projHolder.length; i++) {
            domObj.appendToProjList(projHolder[i][0]);
        }
        showAttrEvent();
        setFirstAsCurrent();
        deleteProjectEvent();
        removeFirstDelete();
    }

    // asks the user for the title name and creates a project based on the given name
    const createProjectEvent = () => {
        let newProjBtn = document.querySelector('.submit-project');
        
        newProjBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let title = document.getElementById('project-title').value;
            if(title.trim() !== '' && checkIfExists(title, projHolder) !== true) {
                createProject(title)
                domObj.hideWindow(projectPromptWindow);
                deleteProjectEvent();
            } else if(checkIfExists(title, projHolder)) {
                domObj.showError('Project already exists.', projectPromptWindow, projectForm);
            } else {
                domObj.showError('Please enter a value for project name.', projectPromptWindow, projectForm);
            }
        });
    }

    const checkIfExists = (value, location) => {
        for(let i = 0; i < location.length; i++) {
            if(location[i].includes(value.trim().toLowerCase())) {
                return true;
            }
        }
    }

    // asks for a series of prompts and then calls the createTask function based on the answers
    const createTaskEvent = () => {
        let newTaskBtn = document.querySelector('.new-task');
        
        newTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // basic variables
            let title = document.getElementById('title');
            let description = document.getElementById('desc');
            let dueDate = document.getElementById('date');
            let priority = document.getElementById('priority');
            if(description.value.trim() === '' && title.value.trim() === '' && !dueDate.value) {
                domObj.showError('Please fill out the description, title and include a valid date.', taskPromptWindow, taskForm);
            } else if(description.value.trim() === '') {
                domObj.showError('Please fill out the description input.', taskPromptWindow, taskForm);
            } else if(title.value.trim() === '') {
                domObj.showError('Please fill out the title input.', taskPromptWindow, taskForm);
            } else if(!dueDate.value) {
                domObj.showError('Please enter a valid date.', taskPromptWindow, taskForm);
            } else {
                createTask(lastClicked, title.value, description.value, dueDate.value, priority.value );
                domObj.appendToTaskList(title.value, description.value, dueDate.value, priority.value )
                domObj.displayDetailsEvent();
                domObj.hideWindow(taskPromptWindow);
                deleteTaskEvent();
            }
            // after we've submitted our task, the window closes
        });

    }

    // iterates over all of our deleteTaskBtn classes and adds an event listener
    const deleteTaskEvent = () => {
        let deleteTaskBtn = document.getElementsByClassName('delete-task');
        for(let i = 0; i < deleteTaskBtn.length; i++) {
            deleteTaskBtn[i].addEventListener('click', (e) => { 
                deleteTaskFromUI(e);
                deleteTaskFromDatabase(e);     
                deleteTaskFromLS(e);   
            });
        }
    }

    // this gets the button's parent Element
    const deleteTaskFromUI = (e) => {
        e.target.parentElement.parentElement.parentElement.remove();
    }

    // this too, but it also gets the first child Node which would be the text
    const deleteTaskFromDatabase = (event) => {
        for(let i = 0; i < projHolder.length; i++) {
            // only iterate over the values if we're in the current project
            if(projHolder[i][0].includes(lastClicked)) {                
                for(let j = 0; j < projHolder[i].length; j++) {
                    // compare the title value of the current iteration to the title in the DOM
                    if(projHolder[i][j].title === event.target.parentElement.parentElement.childNodes[1].textContent) {
                        projHolder[i].splice(j, 1);
                    }
                }
            }
        }
    }

    const deleteTaskFromLS = (event) => {
        checkLocalStorage();
        let storageProjHolder = JSON.parse(localStorage.getItem('projHolder'));
        for(let i = 0; i < storageProjHolder.length; i++) {
            // only iterate over the values if we're in the current project
            if(storageProjHolder[i][0].includes(lastClicked)) {                
                for(let j = 0; j < storageProjHolder[i].length; j++) {
                    // compare the title value of the current iteration to the title in the DOM
                    if(storageProjHolder[i][j].title === event.target.parentElement.parentElement.childNodes[1].textContent) {
                        storageProjHolder[i].splice(j, 1);
                    }
                }
            }
        }
        localStorage.setItem('projHolder', JSON.stringify(storageProjHolder));
    }

    const deleteProjectEvent = (event) => {
        let deleteProjectBtn = document.getElementsByClassName('delete-project');
        for(let i = 0; i < deleteProjectBtn.length; i++) {
            deleteProjectBtn[i].addEventListener('click', (e) => {
                deleteProjectFromUI(e);
                deleteProjectFromDatabase(e);  
                deleteProjectFromLS(e);
                setFirstAsCurrent();
                loadAttributes();
                e.stopPropagation();
            });
        }
    }

    const deleteProjectFromUI = (e) => {
        e.target.parentElement.remove();
    }

    const deleteProjectFromDatabase = (e) => {
        for(let i = 0; i < projHolder.length; i++) {
            if(projHolder[i][0].includes(e.target.parentElement.childNodes[0].textContent)) {
                projHolder.splice(i, 1);
            }
        }
    }

    const deleteProjectFromLS = (e) => {
        checkLocalStorage();
        let storageProjHolder = JSON.parse(localStorage.getItem('projHolder'));
        for(let i = 0; i < storageProjHolder.length; i++) {
            if(storageProjHolder[i][0].includes(e.target.parentElement.childNodes[0].textContent)) {
                storageProjHolder.splice(i, 1);
            }
        }
        localStorage.setItem('projHolder', JSON.stringify(storageProjHolder));
    }

    const setFirstAsCurrent = () => {
        projListItems[0].classList.add('current');
        lastClicked = projHolder[0][0];
    }

    const run = () => {
        checkLocalStorage();
        projHolder = JSON.parse(localStorage.getItem('projHolder'));
        domObj.displayDetailsEvent();
        createProjectEvent();
        createTaskEvent();
        deleteProjectEvent();
        deleteTaskEvent();
        taskPromptBtn.addEventListener('click', (e) => {domObj.taskToggler(taskPromptWindow)});
        newProjectBtn.addEventListener('click', (e) => {domObj.projectToggler(projectPromptWindow)});
        showProjects();
        if(projHolder !== undefined && projHolder.length >= 1) {
            setFirstAsCurrent();
        }
        loadAttributes();
        removeFirstDelete();
    }

    const removeFirstDelete = () => {
        projListItems[0].childNodes[1].style.visibility = 'hidden';
    }
    
    return { run }
}


let myFuncs = funcBox();
myFuncs.run();