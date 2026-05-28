import render from "./render.js";

const delNote = async(taskId) => {
    const userId = localStorage.getItem('userId');

    const req = await fetch(`https://c418d591707a761b.mokky.dev/users/${userId}`);

    const user = await req.json();

    const findTask = user.task.filter(el => el.taskId !== taskId)

    await fetch (`https://c418d591707a761b.mokky.dev/users/${userId}`, {
            method:'PATCH',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({task: findTask})
    })

    render()
}



export default delNote