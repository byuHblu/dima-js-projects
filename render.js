import openEditModal from "./editNote.js";
import delNote from "./deleteNote.js";

const filterItem = document.querySelectorAll('.item');
const filterList = document.getElementById('filterList');
const notesWrap = document.querySelector('.notes-wrap');
const inputSearch = document.querySelector('.input-search');

const click = filterItem.forEach(el => {
    el.addEventListener('click', (data) => {
        console.log(data.target.dataset.value);
    })
})

filterList.addEventListener('change', (data) => {
    console.log(data.target.value);
})

const render = async(text) => {
    notesWrap.textContent=''
    const id = localStorage.getItem('userId')

    const req = await fetch(`https://c418d591707a761b.mokky.dev/users/${id}`);
    const user = await req.json();

    let task = [];

    if(text) {
        task = user.task.filter(el => el.title.toLowerCase().startsWith(text));
    } else {
        task = user.task;
    }
    

    task.forEach((el) => {
        const dataAtribute = notesWrap.querySelector(`[data-task-id='${el.taskId}']`);
        if(dataAtribute) return

        console.log(el)

        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.taskId = el.taskId;
        card.innerHTML = `
                <div class="settings">
                    <button class="edit-note"></button>
                    <button class="del-note"></button>
                    <button class="favorite-note"></button>
                </div>

                <h2 class="title">${el.title}</h2>

                <p class="descr">${el.descr}</p>

                <span class="date">${el.date}</span>` 


        card.querySelector('.edit-note').addEventListener('click', () => {
            openEditModal(el)
        })     

        card.querySelector('.del-note').addEventListener('click', () => {
            delNote(el.taskId);
        })

        notesWrap.appendChild(card)
    })
}

render()

inputSearch.addEventListener('input', () => {
    render(inputSearch.value.toLowerCase())
})

export default render