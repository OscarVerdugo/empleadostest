const { Router } = require('express');
const router = new Router();

var sql = require("mssql");

var config = {
    server: 'DESKTOP-3687V8T',
    user: 'sa',
    password: '123',
    database: 'Empleados'
}

router.get('/empleados-get', (req, res) => {
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

router.post('/empleados-post', (req, res) => {
    const { nombre, primer_apellido, segundo_apellido, fecha_registro, usuario_registro, estatus } = req.body;
    const newEmpleado = { ...req.body };
    if (nombre && primer_apellido && segundo_apellido && fecha_registro && usuario_registro && estatus) {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query(`insert into dbo.Empleados(nombre, primer_apellido, segundo_apellido, fecha_registro, usuario_registro, estatus) values ('${nombre}','${primer_apellido}','${segundo_apellido}','${fecha_registro}','${usuario_registro}',${estatus})`);
        }).then(result => {
            let rows = result.recordset;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(rows);
            sql.close();
        }).catch(err => {
            res.status(500).send({ message: `${err}` });
            sql.close();
        });
    } else {
        res.status(500).json({ error: JSON.stringify(newEmpleado)} );
    }
});

router.put('/empleados-put:id', (req, res) => {
    const { id } = req.params;
    req.params.id = parseInt(req.params.id);
    console.dir(req.params.id);
    const { nombre, primer_apellido, segundo_apellido, fecha_registro, usuario_registro, estatus } = req.body;
    console.dir(req.body);
    if (nombre || primer_apellido || segundo_apellido || fecha_registro || usuario_registro || estatus) {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query(`UPDATE dbo.Empleados SET nombre = '${nombre}', primer_apellido = '${primer_apellido}', segundo_apellido = '${segundo_apellido}', fecha_registro = '${fecha_registro}', usuario_registro = '${usuario_registro}', estatus = ${estatus} WHERE id = ${req.params.id}`);
        }).then(result => {
            let rows = result.recordset;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json(rows);
            sql.close();
        }).catch(err => {
            res.status(500).send({ message: `${err}` });
            sql.close();
        });
     } else {
            res.status(500).json({ error: JSON.stringify("hola")} );
        }
});

router.delete('/empleados-delete:id', (req, res) => {
    const { id } = req.params;
    req.params.id = parseInt(req.params.id);
    console.dir(req.params.id);

    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(`DELETE FROM dbo.Empleados WHERE id = ${req.params.id}`);
    }).then(result => {
        let rows = result.recordset;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(rows);
        sql.close();
    }).catch(err => {
        res.status(500).send({ message: `${err}` });
        sql.close();
    });

});

module.exports = router;