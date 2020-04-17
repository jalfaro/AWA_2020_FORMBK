const conn = require('../../configuration/serverdb');
module.exports = (app) => {

    app.get('/formulario', (req, resp, next) => {
        let query = "SELECT id, nombre, fecha_nacimiento, sexo, fecha_creacion FROM formulario";
        conn.query(query, (error, formularios, cols) => {
            if (error) resp.status(500).json({status: 0, message: "Error en coneccion a la tabla"});
            else resp.json({status: 1, message: "Se obtuvo informacion satisfactoriamente", formularios})
        });
    });

    app.post('/formulario', (req, resp, next) => {
        let query = "INSERT INTO formulario (nombre, fecha_nacimiento, sexo, fecha_creacion) VALUES " +
        `('${req.body.nombre}', '${req.body.fecha}', ${req.body.sexo}, CURDATE())`;
        conn.query(query, (error, formularios, cols) => {
            if (error) resp.status(500).json({status: 0, message:"No se pudo insertar el formulario"});
            else resp.json({status:1, message: "Se inserto satisfactoriamente"});
        });
    });
}
