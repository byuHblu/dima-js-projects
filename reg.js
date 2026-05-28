const btnReg = document.querySelector('.btn-reg');
const modal = document.querySelector('.modal');
const shadow = document.querySelector('.shadow');
const loginInput = document.querySelector('.login-input');
const pass = document.querySelector('.pass');
const pass2 = document.querySelector('.pass2');
const btn = document.querySelector('.btn');
const errorText = document.querySelector('.error-text');

btnReg.addEventListener('click', () => {
    modal.classList.add('open');
})

shadow.addEventListener('click', () => {
    modal.classList.remove('open');
})

btn.addEventListener('click', async() => {
    // console.log(loginInput.value, pass.value, pass2.value)
    errorText.textContent = ''

    if(!loginInput.value || !pass.value || !pass2.value){
        errorText.textContent = 'заполните все поля'
        return
    }

    const req = await fetch('https://c418d591707a761b.mokky.dev/users');

    const users = await req.json();

    // console.log(users)

    const user = users.find(el => el.login === loginInput.value);

    // console.log(user)

    if(user) {
        errorText.textContent = 'пользователь с таким логином уже существует'
        return
    }

    if(pass.value !== pass2.value) {
        errorText.textContent = 'пароли не совпадают'
        return
    }

    const addUser = await fetch('https://c418d591707a761b.mokky.dev/users', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: loginInput.value,
                        pass: pass.value,
                        task: []
                    })
    })

    if(addUser.ok) {
        errorText.textContent = 'вы зарегистрировались :)'
        return
    }
})

