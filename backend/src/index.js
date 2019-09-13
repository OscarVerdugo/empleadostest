const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 5000);

// middlewares
// app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// routes

app.use(cors());
app.use(require('./routes/empleados.js'));
// app.use(require('./routes'));


// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});