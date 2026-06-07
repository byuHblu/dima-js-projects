import openEditModal from "./editNote.js";
import delNote from "./deleteNote.js";
import addFavorite from "./addFavorite.js";
import addFinished from "./finished.js";

const filterItem = document.querySelectorAll('.item');
// const filterList = document.getElementById('filterList');
const notesWrap = document.querySelector('.notes-wrap');
const inputSearch = document.querySelector('.input-search');

filterItem.forEach(el => {
    el.addEventListener('click', (data) => {
        render('', data.target.dataset.value);
    })
})

// filterList.addEventListener('change', (data) => {
//     console.log(data.target.value);
// })

const render = async(text, lang) => {
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

    switch(lang) {
        case 'active':
            task = user.task.filter(el => el.deleted === false && el.finished === false);
            break;
        
        case 'favorite':
            task = user.task.filter(el => el.deleted === false && el.favorite === true);
            break;

        case 'finished':
            task = user.task.filter(el => el.deleted === false && el.finished === true);
            break;    

        case 'deleted':
            task = user.task.filter(el => el.deleted === true);
            break;        
    }
    
    task.forEach((el) => {
        const dataAtribute = notesWrap.querySelector(`[data-task-id='${el.taskId}']`);
        if(dataAtribute) return

        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.taskId = el.taskId;
        card.innerHTML = `
                <div class="settings">
                    <label class="custom-checkbox">
                        <input type="checkbox" class="custom-checkbox-input">
                        <span class="custom-checkbox-mark">
                            <svg class="custom-checkbox-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                            </svg>
                        </span>
                        <span class="custom-checkbox-text">выполнено</span>
                    </label>
                    <div class='settings-wrap'>
                        <button class="edit-note">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </button>

                        <button class="del-note">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-file-earmark-x" viewBox="0 0 16 16">
                                <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293z"/>
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                            </svg>
                        </button>

                        <button class="favorite-note">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                            </svg>
                        </button>

                        <button class="add-in-basket">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <h2 class="title">${el.title}</h2>

                <p class="descr">${el.descr}</p>

                <span class="date">${el.date}</span>` 


        card.querySelector('.custom-checkbox-input').addEventListener('change', () => {
            addFinished(el.taskId)
        })

        card.querySelector('.edit-note').addEventListener('click', () => {
            openEditModal(el)
        })     

        card.querySelector('.del-note').addEventListener('click', () => {
            delNote(el.taskId);
        })

        const favoriteBtn = card.querySelector('.favorite-note');

        favoriteBtn.addEventListener('click', () => {
            addFavorite(el.taskId);
        })

        if (favoriteBtn) {
            if (el.favorite) {
                favoriteBtn.classList.add('active');
            } else {
                favoriteBtn.classList.remove('active');
            }
        }

        notesWrap.appendChild(card)
    })
}

render()

inputSearch.addEventListener('input', () => {
    render(inputSearch.value.toLowerCase())
})

export default render