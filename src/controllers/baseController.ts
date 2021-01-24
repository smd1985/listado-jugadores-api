import { Request, Response } from 'express';

class BaseController {

    public base(req: Request, res: Response) {
        res.json({text: 'Visita la ruta /api/jugadores'});
    }

}

export const baseController = new BaseController;