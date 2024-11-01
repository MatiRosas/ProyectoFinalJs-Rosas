const fondo = document.querySelector(".fondo");
const loginLink = document.querySelector(".login-link");
const registrarLink = document.querySelector(".registrar-link");
const btn = document.getElementById("loginBtn");
const iconoCerrar = document.querySelector(".icono-cerrar");
const registroForm = document.getElementById('registroForm');
const loginForm = document.getElementById('loginForm');
const username = document.getElementById('username');
const emailInput = document.getElementById('registerEmail');
const passwordInput = document.getElementById('registerPassword');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const recordarUsuario = document.querySelector('input[type="checkbox"]');

document.addEventListener("DOMContentLoaded", () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.rememberMe) {
        loginEmail.value = storedUser.email;
        loginPassword.value = storedUser.password;
        recordarUsuario.checked = true; 
    }
});

registrarLink.addEventListener("click", () => {
    fondo.classList.add('active');
});

loginLink.addEventListener("click", () => {
    fondo.classList.remove('active');
});

btn.addEventListener("click", () => {
    fondo.classList.remove('active');
});

iconoCerrar.addEventListener("click", () => {
    fondo.classList.remove('active');
});

registroForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const userData = {
        username: username.value,
        email: emailInput.value,
        password: passwordInput.value,
        rememberMe: false, 
        isLoggedIn: false 
    };

    localStorage.setItem('user', JSON.stringify(userData));
    alert('Registro exitoso. Tus datos han sido guardados.');
    registroForm.reset();
    fondo.classList.remove('active'); 
});


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
        if (storedUser.email === loginEmail.value && storedUser.password === loginPassword.value) {
            
            if (recordarUsuario.checked) {
                storedUser.rememberMe = true; 
            } else {
                storedUser.rememberMe = false; 
            }
            
            storedUser.isLoggedIn = true; 
            localStorage.setItem('user', JSON.stringify(storedUser)); 

            alert('Inicio de sesión exitoso.');
            window.location.href = './html/inicio.html';
        } else {
            alert('Contraseña incorrecta. Intenta de nuevo.');
        }
    } else {
        alert('No hay usuarios registrados.');
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        storedUser.isLoggedIn = false; 
        localStorage.setItem('user', JSON.stringify(storedUser)); 
    }
    alert('Has cerrado sesión.');
    window.location.href = './html/inicio.html'; 
});

