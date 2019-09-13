const { Router } = require('express');
const router = new Router();

var sql = require("mssql");

var config = {
    server: 'DESKTOP-1E8J8UK',
    user: 'sa',
    password: 'sa123',
    database: 'Empleados'
}
//DESKTOP-1E8J8UK



router.get('/empleados-get', (req, res) => {
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query("select * from dbo.Empleados");
    }).then(result => {
        let rows = result.recordset;
        res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('OPTIONS ', 'PUT,GET,DELETE,POST');

        res.status(200).json(rows);
        sql.close();
    }).catch(err => {
        res.status(500).send({ message: `${err}` });
        sql.close();
    });
});;

router.post('/empleados-post', (req, res) => {
    const { nombre, primer_apellido, segundo_apellido, fecha_registro, usuario_registro } = req.body;
    const newEmpleado = { ...req.body };
    if (nombre && primer_apellido && segundo_apellido && fecha_registro && usuario_registro) {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query(`insert into dbo.Empleados(nombre, primer_apellido, segundo_apellido, fecha_registro, usuario_registro) values ('${nombre}','${primer_apellido}','${segundo_apellido}','${fecha_registro}','${usuario_registro}')`);
        }).then(result => {
            let rows = result.recordset;
            // res.setHeader('Access-Control-Allow-Origin', '*');
            // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            // res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');

            

            res.status(200).json({bError:false});
            sql.close();
        }).catch(err => {
            res.status(500).send({ message: `${err}` });
            sql.close();
        });
    } else {
        res.status(500).json( JSON.stringify({bError: true}));
    }
});

router.put('/empleados-put:id', (req, res) => {
    const { id } = req.params;
    req.params.id = parseInt(req.params.id);
    console.dir(req.params.id);
    const { nombre, primer_apellido, segundo_apellido, fecha_registro, usuario_registro } = req.body;
    console.dir(req.body);
    if (nombre || primer_apellido || segundo_apellido || fecha_registro || usuario_registro) {
        new sql.ConnectionPool(config).connect().then(pool => {
            return pool.request().query(`UPDATE dbo.Empleados SET nombre = '${nombre}', primer_apellido = '${primer_apellido}', segundo_apellido = '${segundo_apellido}', fecha_registro = '${fecha_registro}', usuario_registro = '${usuario_registro}' WHERE id = ${req.params.id}`);
        }).then(result => {
            let rows = result.recordset;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(200).json({bError:false});
            sql.close();
        }).catch(err => {
            res.status(500).send({ message: `${err}`,bError :true });
            sql.close();
        });
     } else {
            res.status(500).json({ error: JSON.stringify("hola"),bError :true} );
        }
});

router.delete('/empleados-delete:id', (req, res) => {
    const { id } = req.params;
    req.params.id = parseInt(req.params.id);
    console.dir(req.params.id);

    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query(`UPDATE  dbo.Empleados SET estatus = 0 WHERE id = ${req.params.id}`);
    }).then(result => {
        let rows = result.recordset;
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.status(200).json({bError:false});
        sql.close();
    }).catch(err => {
        res.status(500).send({ message: `${err}`,bError :true });
        sql.close();
    });

});

module.exports = router;