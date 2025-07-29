const socket = io()

const formProducts = document.getElementById('formProducts')
const productsNombre = document.getElementById('msgProducts')
const productsPrecio = document.getElementById('precioProd')
const btnEliminar = document.getElementById('eliminarProd')
const listProducts = document.getElementById('listProducts')

formProducts.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputvalue = productsNombre.value
    const inputPrecio = parseInt(productsPrecio.value)
    socket.emit('msg', inputvalue, inputPrecio)
})

btnEliminar.addEventListener('click', () => {
    const nombreEliminar = productsNombre.value.trim()
    if (nombreEliminar) {
        socket.emit('eliminarProducto', nombreEliminar)
        productsNombre.value = '';
        productsPrecio.value = '';
    }

});


socket.on('productos', (productos) => {
    listProducts.innerHTML = ''
    productos.forEach((producto) => {
        const li = document.createElement('li')
        li.textContent = `${producto.nombre} ${producto.precio}`
        listProducts.appendChild(li)
    });
})




