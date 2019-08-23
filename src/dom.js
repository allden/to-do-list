const domBox = () => {
    let projList = document.querySelector('.project-list');
    let taskList = document.querySelector('.task-list');

    const appendToProjList = (projName) => {
        projList.innerHTML += `<li class="project-name">${projName}</li>`;
    }

    const appendToTaskList = (title, description, dueDate, priority) => {
        taskList.innerHTML += `
        <div class="task-box">
            <ul class="task">
                <li>Title: ${title}</li>
                <li>Description: ${description}</li>
                <li>Date due: ${dueDate}</li>
                <li>Priority: ${priority}</li>
            </ul>
        </div>
        `;
    }

    const clearTaskList = () => {
        taskList.innerHTML = '';
    }

    return { appendToProjList, appendToTaskList, clearTaskList } 
}

export { domBox }