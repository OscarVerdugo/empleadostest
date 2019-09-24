"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = __importDefault(require("./keys"));
// import mysql from 'promise-mysql';
const sql = require('mssql');
const pool = new sql.ConnectionPool(keys_1.default.database);
// pool.getConnection().then(connection =>{
//     pool.releaseConnection(connection);
//     console.log('DB is connected');
// });
pool.connect().then((connection) => {
    console.log('DB is connected');
    sql.close();
});
exports.default = pool;
