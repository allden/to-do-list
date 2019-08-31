const domBox = () => {
    let projList = document.querySelector('.project-list');
    let taskList = document.querySelector('.task-list');
    
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
                <div class="details">
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
    const showPrompt = (prompt, btn) => {
        btn.removeEventListener('click', () => {
            showPrompt(prompt, btn);
        });
        btn.addEventListener('click', () => {
            hidePrompt(prompt, btn);
        });
        prompt.style.display = "block";
    }

    const hidePrompt = (prompt, btn) => {
        btn.removeEventListener('click', () => {
            hidePrompt(prompt, btn);
        });
        btn.addEventListener('click', () => {
            showPrompt(prompt, btn);
        });
        prompt.style.display = "none";
    }

    const showWindowEvent = (prompt, btn) => {
        btn.addEventListener('click', () => {
            showPrompt(prompt, btn);
        });
    }

    const displayDetailsEvent = () => {
        let displayButtons = document.getElementsByClassName('display');
        for(let i = 0; i < displayButtons.length; i++) {
            displayButtons[i].addEventListener('click', () => displayDetails(i));
        }
    }

    const displayDetails = (i) => {
        let details = document.getElementsByClassName('details');
        let displayButtons = document.getElementsByClassName('display');
        displayButtons[i].addEventListener('click', () => hideDetails(i));
        displayButtons[i].removeEventListener('click', () => displayDetails(i));
        details[i].style.display = 'block';
    }

    const hideDetails = (i) => {
        let details = document.getElementsByClassName('details');
        let displayButtons = document.getElementsByClassName('display');
        displayButtons[i].addEventListener('click', () => displayDetails(i));
        displayButtons[i].removeEventListener('click', () => hideDetails(i));
        details[i].style.display = 'none';
    }

    return { appendToProjList, appendToTaskList, clearTaskList, showWindowEvent, displayDetailsEvent, hidePrompt, clearProjList } 
}

export { domBox }