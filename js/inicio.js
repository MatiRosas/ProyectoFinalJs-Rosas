const savedUser = JSON.parse(localStorage.getItem('user'));
if (!savedUser || !savedUser.isLoggedIn) {
    window.location.href = "../index.html";
}

const contenido = document.getElementById("contenido");
const nombreEmpresaForm = document.getElementById("nombreEmpresaForm");
const errorMensaje = document.getElementById("errorMensaje");
const savedEmpresa = localStorage.getItem(`nombre_empresa_${savedUser.email}`);

if (savedEmpresa) {
    contenido.innerHTML = `<h2>${savedEmpresa}</h2>`;
}

nombreEmpresaForm.addEventListener('submit', function (event) {
    event.preventDefault(); 
    const nombreEmpresa = document.getElementById('nombreEmpresa').value.trim().toUpperCase();

    if (!nombreEmpresa) {
        errorMensaje.textContent = "El nombre de la empresa es obligatorio";
    } else {
        errorMensaje.textContent = "";
        localStorage.setItem(`nombre_empresa_${savedUser.email}`, nombreEmpresa);
        contenido.innerHTML = `<h2>${nombreEmpresa}</h2>`;
    }
});

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            storedUser.isLoggedIn = false; 
            localStorage.setItem('user', JSON.stringify(storedUser)); 
        }
        window.location.href = '../index.html';
    }
});

const welcomeMessage = document.getElementById('welcomeMessage');
welcomeMessage.innerHTML = `<p>¡Hola, ${savedUser.username}! Bienvenido de nuevo. ¡Estamos contentos de poder ayudarte!</p>`;
