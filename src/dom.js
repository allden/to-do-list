const domBox = () => {
    let projList = document.querySelector('.project-list');
    let taskList = document.querySelector('.task-list');
    let taskPromptActive = false;
    let projPromptActive = false;
    
    const appendToProjList = (projName) => {
        projList.innerHTML += `<div class="project-name"><p>${projName}</p><button class="button delete-project">x</button></div>`;
    }

    const appendToTaskList = (title, description, dueDate, priority) => {
        taskList.innerHTML += `
        <div class="task-box">
            <div class="task-title">
                <h3>${title}</h3>
                <div class="title-buttons">
                    <button class="button display">Display</button>
                    <button class="button delete-task">Delete</button>
                </div>
            </div>
            <ul class="task">
                <div class="details invisible">
                <li><strong>Description</strong>: ${description}</li>
                <li><strong>Date due</strong>: ${dueDate}</li>
                <li><strong>Priority</strong>: ${priority}</li>
                </div>
            </ul>
        </div>
        `;
    }

    const clearTaskList = () => {
        taskList.innerHTML = '';
    }

    const clearProjList = () => {
        projList.innerHTML = '';
    }

    // in this case prompt is the div that is shown and btn is the button that will be clicked
    const taskToggler = (window) => {
        if(taskPromptActive === false && projPromptActive === false) {
            // do this
            window.style.display = 'block';
            console.log(window);
            taskPromptActive = true;
            console.log('hello');
        } else {
            // do this
            console.log(window);
            window.style.display = 'none';
            taskPromptActive = false;
            console.log('hello');
        }
    }

    const projectToggler = (window) => {
        if(projPromptActive === false && taskPromptActive === false) {
            // do this
            window.style.display = 'block';
            console.log(window);
            projPromptActive = true;
            console.log('hello');
        } else {
            // do this
            console.log(window);
            window.style.display = 'none';
            projPromptActive = false;
            console.log('hello');
        }
    }

    const hideWindow = (window) => {
        window.style.display = 'none';
        taskPromptActive = false;
        projPromptActive = false;
    }

    const displayDetailsEvent = () => {
        let displayButtons = document.getElementsByClassName('display');
        for(let i = 0; i < displayButtons.length; i++) {
            displayButtons[i].addEventListener('click', (e) => 
            {
                if(e.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[1].classList.contains('visible') === false) {
                    displayButtons[i].textContent = 'Hide';
                    e.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[1].classList.remove('invisible');
                    e.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[1].classList.add('visible');
                    console.log(e.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[1]);
                } else {
                    displayButtons[i].textContent = 'Display';
                    e.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[1].classList.remove('visible');
                    e.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[1].classList.add('invisible');
                    console.log(e.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[1]);
                }
            });
        }
    }

    const showError = (msg, container, beforeElement) => {
        let prompt = container;
        let taskForm = beforeElement;
        let errorBox = document.createElement('div');
        errorBox.classList.add('error');
        let textNode = document.createTextNode(msg);
        errorBox.appendChild(textNode);        
        prompt.insertBefore(errorBox, taskForm);
        setTimeout(hideError, 2000);
    }

    const hideError = () => {
        document.querySelector('.error').remove();
    }

    return { appendToProjList, appendToTaskList, clearTaskList, displayDetailsEvent, clearProjList, taskToggler, projectToggler, hideWindow, showError } 
}

export { domBox }