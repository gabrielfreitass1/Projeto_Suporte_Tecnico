//arquivo responsavel por toda config e execução do backend

const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Aplicação sendo executada na porta: ', port);
})