const { Router } = require('express');

const router = new Router();

router.get('/test', (req, res) => {
    res.send("hola");
});  

module.exports = router;