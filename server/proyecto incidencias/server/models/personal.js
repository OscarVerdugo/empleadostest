const sql = require('mssql');
const {schema} = sql;

const PersonalSchema =  new schema ({
    id: { type: Number, required: True },
    nom: { type: String, required: True },
    p_apellido: { type: String, required: True },
    s_apellido: { type: String, required: True },
    num_emp: { type: Number, required: True },
    id_tipopersonal: {  type: Number, required: True },
    estatus: { type: Boolean, required: True }
});

module.exports =  sql.model('Personal', PersonalSchema);