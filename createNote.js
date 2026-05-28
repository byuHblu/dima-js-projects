const noteName = document.querySelector('.name-note');
const noteText = document.querySelector('.text-note');
const addNoteBtn = document.querySelector('.add-note');
const errorText3 = document.querySelector('.error-text3')
const modal3 = document.querySelector('.modal3');
const shadow3 = document.querySelector('.shadow3');
const openModal = document.querySelector('.add-note-btn');
const not = document.querySelector('.not')
const id = localStorage.getItem('userId');
import render from "./render.js";

openModal.addEventListener('click', () => {
    modal3.classList.add('open');
})

shadow3.addEventListener('click', () => {
    modal3.classList.remove('open');
})

addNoteBtn.addEventListener('click', async() => {
    errorText3.textContent = '';

    if(!id) {
        errorText3.textContent = 'авторизуйтесь';
        return
    }

    if(!noteName.value || !noteText.value) {
        errorText3.textContent = 'введите название и текст заметки';
        return
    }

    const req = await fetch(`https://c418d591707a761b.mokky.dev/users/${id}`);
    const user = await req.json();
    
    const tasks = user.task;

    const taskId = user.task.length ? tasks[user.task.length - 1].taskId + 1 : 1;

    console.log(taskId)

    const time = new Date();
    const date = `${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()}`


    const task = [...user.task, {title: noteName.value, descr: noteText.value, date: date, taskId: taskId}];

    const addTask = await fetch(`https://c418d591707a761b.mokky.dev/users/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({task})
    });

    noteName.value = '';
    noteText.value = '';

    if (!addTask.ok) {
        alert('Заметка не добавлена!');
    } else {
        modal3.classList.remove('open');

        not.classList.add('active');

        setTimeout (() => {
            not.classList.remove('active');
        }, 1500)
    };

    render()
});
