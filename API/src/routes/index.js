const express = require('express');
const router = express.Router();
const app = express();
require('dotenv').config();

app.use(express.json());


router.get('/API', (req, res) => {
    res.status(200).send('API de Suporte Técnico no ar 🚀');
})

module.exports = router;