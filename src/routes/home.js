import { Router } from "express";

const createHomeRouter = (io) => {
    const routerHome = Router()

    routerHome.post('/apis/products', (req, res) => {
        res.render('home')
    })

    io.on('nuevoProdAgregado', (data) => {
        const contenedor = document.getElementById('resultado');
        contenedor.innerHTML = `<p>Producto recibido: ${data.nombre} - $${data.precio}</p>`;
    })
    return routerHome
}
export default createHomeRouter;