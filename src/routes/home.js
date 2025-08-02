import { Router } from "express";
const routerHome = Router()

routerHome.get('/api/products', (req, res) => {

    res.render('home', {})
})


export default routerHome;


