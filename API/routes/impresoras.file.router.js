import express from "express";
import {read, write} from "../src/utils/files.js";
import Joi from 'joi';
import { agregarIpRegistro } from "../middleware/middleware.js";
import dayjs from "dayjs";

export const impresorasFileRouter = express.Router();
impresorasFileRouter.use(agregarIpRegistro);

const productoSchema = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().optional(),
    precio: Joi.number().required(),
    categoria: Joi.string().optional(),
});

//Filtro
impresorasFileRouter.get('/',(req, res) => {
    let impresoras = read();

    const {ingreso, respuesta, limit } = req.query;

    if (ingreso && respuesta){
        impresoras = impresoras.filter(impresora => impresora[ingreso] && impresora[ingreso].toString().toLowerCase() === respuesta.toLowerCase());
    }

    if(limit){
        impresoras = impresoras.slice(0, parseInt(limit));
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(impresoras));
})

//GET
impresorasFileRouter.get ("/", (req, res) => {
    const impresoras = read();
    console.log('impresoras', impresoras);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(impresoras));
});

// GET ID
impresorasFileRouter.get('/:id', (req, res) => {
    const impresoras = read();
    const impresora = impresoras.find(impresora => impresora.id === parseInt(req.params.id));
    if (impresora) {
        res.json(impresora);
    } else {
        res.status(404).end();
    }
});

//// PUT: Actualizar un campo de todos los registros
impresorasFileRouter.post('/', (req, res) => {
        const impresoras = read();
        const impresora ={
            ...req.body,
            id: impresoras.length + 1
        }
        impresoras.push(impresora);
        write(impresoras);
        res.status(201).json(impresoras);
    })

    impresorasFileRouter.put('/actualizartodo', (req, res) => {
        const ias = read(); // Leer todos los registros
    
        // Extraer el campo y el valor del cuerpo de la solicitud
        const { field, value } = req.body; 
    
        // Validar si el campo y el valor están presentes
        if (!field || value === undefined) {
            return res.status(400).json({ message: 'El campo y el valor son requeridos.' });
        }
    
        // Verificar que hay registros para actualizar
        if (!Array.isArray(impresoras) || ias.length === 0) {
            return res.status(404).json({ message: 'No se encontraron registros para actualizar.' });
        }
    
        
        impresoras.forEach(impresora => {
            impresora[field] = value; 
            impresora.updated_at = dayjs().format('HH:mm DD-MM-YYYY'); 
        });
    
        // Intentar guardar los registros actualizados
        try {
            write(impresoras); // Guardar los registros actualizados
            res.json({ message: 'Todos los registros han sido actualizados', updatedRecords: impresoras }); // Enviar los registros actualizados como respuesta
        } catch (error) {
            console.error('Error al escribir el archivo:', error);
            res.status(500).json({ message: 'Error al guardar los registros.' });
        }
    });

//PUT
/*impresorasFileRouter.put('/:id', (req, res) => {
    try {
        validateImpresora(req.body); // Validación
        const impresoras = read();
        let impresora = impresoras.find(impresora => impresora.id === parseInt(req.params.id));
        if (impresora) {
            impresora = {
                ...impresora,
                ...req.body,
            };

            impresoras[impresoras.findIndex(impresora => impresora.id === parseInt(req.params.id))] = impresora;
            write(impresoras);
            res.json(impresora);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});*/

//DELETE
impresorasFileRouter.delete('/:id', (req, res) => {
    const impresoras = read();
    const impresora = impresoras.find(impresora => impresora.id === parseInt(req.params.id));
    if (impresora) {
        impresoras.splice(
            impresoras.findIndex(impresora => impresora.id === parseInt(req.params.id)),
            1
        );
        write(impresoras);
        res.json(impresora);
    } else {
        res.status(404).end();
    }
});


