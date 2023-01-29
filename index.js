window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    if (localStorage.getItem("saved_tasks_objects") !== null) {
        jsonObjectString = localStorage.getItem("saved_tasks_objects");
        jsonObject = JSON.parse(jsonObjectString);

        let array = Object.values(jsonObject);

        array.forEach(element => {
            displayTask(element, list_el, input)
        });
    }


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        input_correct = false;
        while (!input_correct) {
            new_task = input.value;
            if (!new_task) {
                alert("Please enter a task");
                return;
            }
            else {
                input_correct = true;
            }
        }
        const add_task = new_task;
        displayTask(add_task, list_el, input);
    });
});

function displayTask(task, list_el, input) {

    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");

    task_content_el.classList.add("task-content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    task_edit_el.addEventListener('click', () => {
        if (task_edit_el.innerText.toLowerCase() == "edit") {
            task_input_el.removeAttribute("readonly");
            task_input_el.focus();
            task_edit_el.innerText = "Save";
        }
        else {
            task_input_el.setAttribute("readonly", "readonly");
            task_edit_el.innerText = "Edit";
            task = task_input_el.value;
            saveTasks();
        }
    });

    task_delete_el.addEventListener('click', () => {
        list_el.removeChild(task_el);
        localStorage.clear();
        saveTasks();
    });
    saveTasks();


    input.value = "";
    return;
}

function saveTasks() {
    saved_task_JSON = {};
    for (var i = 0; i < document.getElementById('tasks').getElementsByClassName('task').length; i++) {
        parent = document.getElementById('tasks').children[i];
        child = parent.children[0].children[0];

        current_task = child.value;
        saved_task_JSON[i] = current_task;
    }
    localStorage.setItem('saved_tasks_objects', JSON.stringify(saved_task_JSON));
}