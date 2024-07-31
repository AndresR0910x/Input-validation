const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/add-user', async (req, res) => {
    const { nombres, apellidos, cedula_ruc, telefono, fecha_de_nacimiento, salario, email, password } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        req.getConnection((err, conn) => {
            if (err) {
                console.error('Error de conexión:', err);
                return res.status(500).send('Error de conexión a la base de datos');
            }
            
            const query = `INSERT INTO user (nombres, apellidos, cedula_ruc, telefono, fecha_de_nacimiento, salario, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            conn.query(query, [nombres, apellidos, cedula_ruc, telefono, fecha_de_nacimiento, salario, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error en la consulta SQL:', err);
                    return res.status(500).send(`Error en la consulta SQL: ${err.message}`);
                }
                res.send('Usuario agregado exitosamente');
            });
        });
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        res.status(500).send('Error al encriptar la contraseña');
    }
});

module.exports = router;