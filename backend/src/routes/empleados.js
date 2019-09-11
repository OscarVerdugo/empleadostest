const { Router } = require('express');
const router = new Router();

var sql = require("mssql");

var config = {
    server: 'DESKTOP-3687V8T',
    user: 'sa',
    password: '123',
    database: 'Empleados'
}

router.get('/', (req, res) => {
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query("select * from dbo.Empleados")
    }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();
    }).catch(err => {
        res.status(500).send({ message: "${err}" })
        sql.close();
    });
});

router.post('/', (req, res) => {
    const { nombre, primer_apellido, segundo_apellido, fecha_registro, usuario_registro, estatus } = req.body;
    const newEmpleado = { ...req.body };
    if (nombre && primer_apellido && segundo_apellido && fecha_registro && usuario_registro, estatus) {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query("insert into dbo.Empleados(nombre, primer_apellido, segundo_apellido, fecha_registro, usuario_registro, estatus)")
        }).then(result => {
            let rows = result.recordset
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).json(rows);
            sql.close();
        }).catch(err => {
            res.status(500).send({ message: "${err}" })
            sql.close();
        });
    } else {
        res.status(500).json({ error: 'There was an error.' });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, primer_apellido, segundo_apellido, fecha_registro, usuario_registro, estatus } = req.body;
    if (id && nombre && primer_apellido && segundo_apellido && fecha_registro, usuario_registro, estatus) {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query("select *from dbo.Empleados where id = ?", [id])
        }).then(result => {
            let rows = result.recordset
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.status(200).json(rows);
            sql.close();
        }).catch(err => {
            res.status(500).send({ message: "${err}" })
            sql.close();
        });
        if (movie.id === id) {


        } else {
            res.status(500).json({ error: 'There was an error.' });
        }
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (id) {
        _.each(movies, (movie, i) => {
            if (movie.id == id) {
                movies.splice(i, 1);
            }
        });
        res.json(movies);
    }
});

module.exports = router;