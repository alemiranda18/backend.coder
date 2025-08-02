const socket = io()

const formProducts = document.getElementById('formProducts')
const productsNombre = document.getElementById('msgProducts')
const productsPrecio = document.getElementById('precioProd')
const btnEliminar = document.getElementById('eliminarProd')
const listProducts = document.getElementById('listProducts')


//saco el valor del formulario y lo envio a app.js 
/* formProducts.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputvalue = productsNombre.value
    const inputPrecio = parseInt(productsPrecio.value)
    socket.emit('msg', inputvalue, inputPrecio)
}) */

//envio el valor del producto que deseo eliminar
btnEliminar.addEventListener('click', () => {
    const nombreEliminar = productsNombre.value.trim()
    if (nombreEliminar) {
        socket.emit('eliminarProducto', nombreEliminar)
        productsNombre.value = '';
        productsPrecio.value = '';
    }
});

//socket para mostrar el prod en pantalla
socket.on('productos', (productos) => {
    listProducts.innerHTML = ''
    productos.forEach((producto) => {
        const li = document.createElement('li')
        li.textContent = `${producto.nombre} ${producto.precio}`
        listProducts.appendChild(li)
    });
})

//envio el valor del input para mostrarlo en home
formProducts.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputvalue = productsNombre.value
    const inputPrecio = parseInt(productsPrecio.value)
    socket.emit('prodAgregado', inputvalue, inputPrecio)
})


socket.on('nuevoProducto', (nuevoProdAgregado) => {
    const contenedor = document.getElementById('conteiner')
    if (!contenedor) {
        console.error('No se encontró el contenedor con id="conteiner"');
        return;
    }
    contenedor.innerHTML = ''
    nuevoProdAgregado.forEach((productos) => {
        const li = document.createElement('li')
        li.textContent = `${productos.nombre} ${productos.precio}`
        contenedor.appendChild(li)
    })
})

