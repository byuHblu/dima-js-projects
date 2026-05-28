const btnAuth = document.querySelector('.btn-auth');
const modal2 = document.querySelector('.modal2');
const shadow2 = document.querySelector('.shadow2');
const btn2 = document.querySelector('.btn2');
const authInput = document.querySelector('.auth-input');
const passAuth = document.querySelector('.pass-auth');
const errorText2 = document.querySelector('.error-text2');

btnAuth.addEventListener('click', () => {
    modal2.classList.add('open');
})

shadow2.addEventListener('click', () => {
    modal2.classList.remove('open');
})

btn2.addEventListener('click', async() => {
    if(!authInput.value || !passAuth.value) {
        errorText2.textContent = 'заполните поля';
        return
    }

    const req = await fetch('https://c418d591707a761b.mokky.dev/users');
    const users = await req.json();

    const user = users.find(el => el.login === authInput.value && el.pass === passAuth.value);

    if(!user) {
        errorText2.textContent = 'логин или пароль не верны'
        return
    }

    errorText2.textContent = 'вы вошли';
    localStorage.setItem('userId', user.id);

    window.location.reload();
})