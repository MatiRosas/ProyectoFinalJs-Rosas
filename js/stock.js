document.addEventListener('DOMContentLoaded', function() {
    const contenedorProductos = document.getElementById("contenedor-producto");
    const productoInput = document.getElementById("producto");
    const agregarProductoBtn = document.getElementById("agregarProducto");
    const logoutBtn = document.getElementById("logoutBtn");
    const apiDolarOficial = document.getElementById("dolarOficial");
    const apiDolarBlue = document.getElementById("dolarBlue");

    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (!savedUser || !savedUser.isLoggedIn) {
        window.location.href = '../index.html';
        return;
    }

    const nombreEmpresa = localStorage.getItem(`nombre_empresa_${savedUser.email}`);
    const contenido = document.getElementById("contenido");
    contenido.innerHTML = nombreEmpresa ? `<h2>${nombreEmpresa}</h2>` : `<h2>Nombre de la empresa no encontrado</h2>`;
    let productosUsuario = JSON.parse(localStorage.getItem(`productos_${savedUser.email}`)) || [];

    function mostrarProductos() {
        contenedorProductos.innerHTML = ''; 
        productosUsuario.forEach((producto, index) => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto-individual");
            productoDiv.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Cantidad: <span>${producto.cantidad}</span></p>
                <button class="btn-sumar" data-index="${index}">+1</button>
                <button class="btn-restar" data-index="${index}">-1</button>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;
            contenedorProductos.appendChild(productoDiv);
        });
    }

    function actualizarStorage() {
        localStorage.setItem(`productos_${savedUser.email}`, JSON.stringify(productosUsuario));
    }

    agregarProductoBtn.addEventListener('click', function() {
        const nombreProducto = productoInput.value.trim().toUpperCase();

        if (nombreProducto) {
            const productoExistente = productosUsuario.find(p => p.nombre === nombreProducto);
            if (productoExistente) {
                alert('Este producto ya está en la lista');
            } else {
                productosUsuario.push({ nombre: nombreProducto, cantidad: 0 });
                actualizarStorage();
                mostrarProductos();
            }
            productoInput.value = ''; 
        } else {
            alert('Por favor, ingresa un nombre para el producto');
        }
    });

    contenedorProductos.addEventListener('click', function(event) {
        const index = event.target.dataset.index;

        if (event.target.classList.contains('btn-sumar')) {
            productosUsuario[index].cantidad += 1;
            actualizarStorage();
            mostrarProductos();
        } else if (event.target.classList.contains('btn-restar')) {
            if (productosUsuario[index].cantidad > 0) {
                productosUsuario[index].cantidad -= 1;
                actualizarStorage();
                mostrarProductos();
            }
        } else if (event.target.classList.contains('btn-eliminar')) {
            productosUsuario.splice(index, 1); // Eliminar producto
            actualizarStorage();
            mostrarProductos();
        }
    });

    mostrarProductos();

    function obtenerDolar() {
        const urlOficial = 'https://dolarapi.com/v1/dolares/oficial';
        const urlBlue = 'https://dolarapi.com/v1/dolares/blue';

        fetch(urlOficial)
            .then(response => {
                if (!response.ok) throw new Error('Error al obtener el Dólar Oficial');
                return response.json();
            })
            .then(data => {
                apiDolarOficial.innerText = `Dólar Oficial: Compra $${data.compra} / Venta $${data.venta}`;
            })
            .catch(error => console.error('Error al obtener el Dólar Oficial:', error));

        fetch(urlBlue)
            .then(response => {
                if (!response.ok) throw new Error('Error al obtener el Dólar Blue');
                return response.json();
            })
            .then(data => {
                apiDolarBlue.innerText = `Dólar Blue: Compra $${data.compra} / Venta $${data.venta}`;
            })
            .catch(error => console.error('Error al obtener el Dólar Blue:', error));
    }

    obtenerDolar();

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
});
