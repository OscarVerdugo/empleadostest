import keys from './keys';
// import mysql from 'promise-mysql';
const sql = require('mssql');

const pool = new sql.ConnectionPool(keys.database);

// pool.getConnection().then(connection =>{
//     pool.releaseConnection(connection);
//     console.log('DB is connected');
// });

pool.connect().then((connection: any) =>{
    console.log('DB is connected');
    sql.close();
});
export default pool;
