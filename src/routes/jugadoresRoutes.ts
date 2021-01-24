import express, { Router } from 'express';

import jugadoresController from '../controllers/jugadoresController';

class JugadoresRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', jugadoresController.listarJugadores);
        this.router.get('/:id', jugadoresController.devolverJugador);
        this.router.post('/', jugadoresController.crearJugador);
        this.router.put('/:id', jugadoresController.actualizarJugador);
        this.router.delete('/:id', jugadoresController.eliminarJugador);
        this.router.get('/filtros/:pos/:eq/:nac', jugadoresController.listarJugadoresFiltrados)
    }

}

export default new JugadoresRoutes().router;

