//importamos request y response
import { Request, Response } from 'express';

//importamos el archivo donde tenemos definido y exportado el pool para proceder a hacer las consultas
import pool from '../database';

class JugadoresController {

    public async listarJugadores(req: Request, res: Response): Promise<void> {
        const jugadores = await pool.query('SELECT * FROM jugadores');
        res.json(jugadores);
    }

    public async listarJugadoresFiltrados(req: Request, res: Response): Promise<any> {

        const {pos,eq,nac} = req.params;
        let jugadores=await pool.query('SELECT * FROM jugadores');

        if(pos!= 0 && pos!= "undefined" && pos != "" && eq != 0 && eq != "undefined" && eq != "" && nac != 0 && nac != "undefined" && nac != ""){
            
            jugadores = await pool.query('SELECT * FROM jugadores WHERE posicion = ? AND equipo = ? AND nacionalidad = ?', [pos,eq,nac]);
        }else if(pos!= 0 && pos!= "undefined" && pos != "" && eq != 0 && eq != "undefined" && eq != ""){
            
            jugadores = await pool.query('SELECT * FROM jugadores WHERE posicion = ? AND equipo = ?', [pos,eq]);
        }else if(pos!= 0 && pos!= "undefined" && pos != "" && nac != 0 && nac != "undefined" && nac != ""){
            
            jugadores = await pool.query('SELECT * FROM jugadores WHERE posicion = ? AND nacionalidad = ?', [pos,nac]);
        }else if(eq != 0 && eq != "undefined" && eq != "" && nac != 0 && nac != "undefined" && nac != "" ){
            
            jugadores = await pool.query('SELECT * FROM jugadores WHERE equipo = ? AND nacionalidad = ?', [eq,nac]);
        }else if(pos!= 0 && pos!= "undefined" && pos != ""){
            
            jugadores = await pool.query('SELECT * FROM jugadores WHERE posicion = ?', [pos]);
        }else if(eq != 0 && eq != "undefined" && eq != ""){
            
            jugadores = await pool.query('SELECT * FROM jugadores WHERE equipo = ?', [eq]);
        }else if(nac != 0 && nac != "undefined" && nac != ""){
            
            jugadores = await pool.query('SELECT * FROM jugadores WHERE nacionalidad = ?', [nac]);
        }
        

        if (jugadores.length > 0) {
            return res.json(jugadores);
        }
        res.status(404).json({ text: "No hay jugadores con estos filtros aplicados" });
    }

    public async devolverJugador(req: Request, res: Response): Promise<any> {
        
        const { id } = req.params;
        const jugadores = await pool.query('SELECT * FROM jugadores WHERE id = ?', [id]);
        
        if (jugadores.length > 0) {
            return res.json(jugadores[0]);
        }
        res.status(404).json({ text: "Este jugador no existe en la base de datos" });
    }

    public async crearJugador(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO jugadores set ?', [req.body]);
        res.json({ message: 'Jugador guardado correctamente!!' });
    }

    public async actualizarJugador(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const antiguoJugador = req.body;
        await pool.query('UPDATE jugadores set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "Jugador actualizado correctamente!!" });
    }

    public async eliminarJugador(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM jugadores WHERE id = ?', [id]);
        res.json({ message: "Jugador eliminado correctamente" });
    }
}

const jugadoresController = new JugadoresController;
export default jugadoresController;