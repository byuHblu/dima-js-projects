const modal4 = document.querySelector('.modal4');
const shadow4 = document.querySelector('.shadow4');
const nameNote2 = document.querySelector('.name-note2');
const textNote2 = document.querySelector('.text-note2');
const saveNote = document.querySelector('.save-note');
import render from "./render.js";

const openEditModal = (el) => {
    modal4.classList.add('open');
    const title = el.title;
    const descr = el.descr;

    nameNote2.value = title;
    textNote2.value = descr;

    saveNote.addEventListener('click', () => {
        save(el.taskId)
    })
}

shadow4.addEventListener('click', () => {
    modal4.classList.remove('open');
})

const save = async(taskId) => {
    const userId = localStorage.getItem('userId')

    const req = await fetch(`https://c418d591707a761b.mokky.dev/users/${userId}`);
    const user = await req.json();

    const updateTasks = user.task;

    const index = updateTasks.findIndex(el => el.taskId === taskId);

    updateTasks[index].title = nameNote2.value;
    updateTasks[index].descr = textNote2.value;

    await fetch(`https://c418d591707a761b.mokky.dev/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-type':'application/json'
                    },
                    body: JSON.stringify({
                        task: updateTasks
                    })
    });

    modal4.classList.remove('open');

    render()
    // console.log(index)
}

export default openEditModal