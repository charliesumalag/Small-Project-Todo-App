// Getting Elements
const addNewEl = document.getElementById('add-new-task-title');
const defaultDisEl = document.getElementById('default-dis');
const modalEl = document.getElementById('modal');
const closeEl = document.querySelectorAll('.close');
const task_nameInputEl = document.getElementById('task_name');
const dateInputEl = document.getElementById('date');
const descriptionInputEl = document.getElementById('description');
const addBtn = document.getElementById('submit')
const msgEl = document.getElementById('message');
const msgSuccessEl = document.getElementById('message-success');
const displayTaskEl = document.getElementById('main-task-container');
const taskAvailability = document.getElementById('task-list-avalible');
let editingTask = null;
let list = {};

// addeventlister modal





addNewEl.addEventListener('click', () => {
    defaultDisEl.classList.add('hide');
    modalEl.classList.remove('hide');
    editingTask = null; // Reset editing state
})
closeEl.forEach((close) => {
    close.addEventListener('click', (e) => {
        e.preventDefault();
        defaultDisEl.classList.remove('hide');
        modalEl.classList.add('hide');
        msgEl.classList.add('hide');
        msgSuccessEl.classList.add('hide');
    })
})
addBtn.addEventListener('click',(e) => {
    e.preventDefault();
    formValidation();

    task_nameInputEl.value = "";
    dateInputEl.value = "";
    descriptionInputEl.value = "";
})
// form validation
let formValidation = () => {
    let inputs  = [task_nameInputEl, dateInputEl, descriptionInputEl]
    let allFilled = true;
    inputs.forEach((input) => {
        if (input.value === "") {
            allFilled = false;
        }
    });
    if(!allFilled){
        msgEl.classList.remove('hide');
        msgEl.innerHTML = 'Complete the input fields.';
    }else{
        acceptData();
        msgEl.classList.add('hide');
        msgSuccessEl.classList.remove('hide');

    }
}
// accept data

let acceptData = () => {
    list['task_name'] = task_nameInputEl.value;
    list['task_date'] = dateInputEl.value;
    list['task_description'] = descriptionInputEl.value;
    if (editingTask) {
        // Update the task (remove old task and add new one)
        editingTask.remove();
        addBtn.innerHTML = 'Add'; // Reset button text after update
        msgSuccessEl.innerHTML = 'Updated Successfully';
        setTimeout(() => {
            msgSuccessEl.classList.add('hide');
        },2000)
        editingTask = null; // Reset editing state
    }else{
        msgSuccessEl.innerHTML = 'Added Successfully';
        setTimeout(() => {
            msgSuccessEl.classList.add('hide');
        },2000)
    }
    createTask();
}
// craeate task
let createTask = () => {
    displayTaskEl.innerHTML += `
            <div class="task-content">
                <p class="task-num-text">${list['task_name']}</p>
                <p class="date">${list['task_date']}</p>
                <p class="task-description">${list['task_description']}</p>
                <div class="icon-contianer">
                    <i onClick="editTask(this)" class="fa-solid fa-pen-to-square"></i>
                    <i onClick="deleteTask(this)" class="fa-solid fa-trash"></i>
                </div>
            </div><br>
    `
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
}
let editTask = (e) => {
    defaultDisEl.classList.add('hide');
    modalEl.classList.remove('hide');
    task_nameInputEl.value = e.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    dateInputEl.value = e.parentElement.previousElementSibling.previousElementSibling.innerHTML;
    descriptionInputEl.value = e.parentElement.previousElementSibling.innerHTML;
    addBtn.innerHTML = 'Update';
    editingTask = e.parentElement.parentElement;

}
console.log(Object.keys(list).length === 0);
