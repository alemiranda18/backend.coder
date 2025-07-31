import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import realTimeProducts from './src/routes/realTimeProducts.js'
import createHomeRouter from './src/routes/home.js'



const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`)
})
const io = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.static('./public'))
app.use('/', realTimeProducts)
app.use('/', createHomeRouter(io))

const productos = [
    { nombre: "Auriculares Bluetooth", precio: 4500 },
    { nombre: "Mouse inalámbrico", precio: 3200 },
    { nombre: "Teclado mecánico", precio: 8700 },
    { nombre: "Monitor 24 pulgadas", precio: 38500 },
    { nombre: "Webcam HD", precio: 6100 }
]
let nuevoProdAgregado = []

io.on('connection', (socket) => {
    socket.emit('productos', productos)

    //guardo el producto en un array y envio el array actualizado
    socket.on('msg', (nombre, precio) => {
        const nuevoProd = { nombre, precio }
        productos.push(nuevoProd)
        io.emit('productos', productos)
    })
    //encuentro el producto lo elimino y  envio el array actualizado
    socket.on('eliminarProducto', (nombre) => {
        const index = productos.findIndex(p => p.nombre.toLowerCase().trim() === nombre.toLowerCase().trim())
        if (index !== -1) {
            productos.splice(index, 1);
            io.emit('productos', productos);
        }
    });
    //recibo el producto agregado 
    socket.on('prodAgregado', (nombre, precio) => {
        const prodAgregado = { nombre, precio }
        nuevoProdAgregado.push(prodAgregado)
        io.emit('nuevoProducto', nuevoProdAgregado)
    })

})
