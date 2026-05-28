const btnsWrap = document.querySelector('.btns-wrap');
const logout = document.querySelector('.logout');

const userId = localStorage.getItem('userId');

if(userId) {
    btnsWrap.classList.add('auth');
} else {
    btnsWrap.classList.remove('auth');
}

logout.addEventListener('click', () => {
    localStorage.removeItem('userId');
    window.location.reload();
})



