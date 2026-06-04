import render from "./render.js";

const addFavorite = async(id) => {

    const userId = localStorage.getItem('userId');
    const req = await fetch(`https://c418d591707a761b.mokky.dev/users/${userId}`);
    const user = await req.json();

    const task = user.task;

    const findTask = task.find(el => el.taskId === id);


    findTask.favorite = !findTask.favorite

    await fetch (`https://c418d591707a761b.mokky.dev/users/${userId}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-type': 'application/json'
                                } ,
                                body: JSON.stringify({task: task})
    })

    render()
}

export default addFavorite