const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/topchemistry');
const TopChemistry = mongoose.model('topchemistry');

const app = express();

app.use(express.json());

app.use((request, response, next) => {
    //console.log("Acessou o Middleware!");
    response.header("Access-Control-Allow-Origin", "http://localhost:3000");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
});

mongoose.connect('mongodb://localhost/progsis', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
});

app.get('/topchemistry/:id', (request, response) => {
    TopChemistry.findOne({ _id: request.params.id }).then((topchemistry) => {
        return response.json(topchemistry);
    }).catch((erro) => {
        return response.status(400).json({
            error: true,
            message: "Nenhum dado encontrado!"
        })
    })
});

app.get('/topchemistry', (request, response) => {
    /*return response.status(400).json({
        error: true,
        message: "Nenhum dado encontrado!"
    })*/

    TopChemistry.find({}).then((topchemistry) => {
        return response.json(topchemistry);
    }).catch((erro) => {
        return response.status(400).json({
            error: true,
            message: "Nenhum dado encontrado!"
        })
    })
});

app.post('/topchemistry', (request, response) => {
    //console.log(response.body);
    //return response.json(request.body);
    const topchemistry = TopChemistry.create(request.body, (erro) => {
        if (erro) return response.status(400).json({
            error: true,
            message: "Error: o dado não foi cadastrado!"
        })

        return response.status(400).json({
            error: false,
            message: "Dado cadastrado com sucesso!"
        })
    })
});

app.put('/topchemistry/:id', (request, response) => {
    const topchemistry = TopChemistry.updateOne({ _id: request.params.id }, request.body, (erro) => {
        if (erro) return response.status(400).json({
            error: true,
            message: "Error: O dado não foi alterado!"
        });

        return response.json({
            error: false,
            message: "Dado alterado com sucesso!"
        });
    });
});

app.delete('/topchemistry/:id', (request, response) => {
    const topchemistry = TopChemistry.deleteOne({_id: request.params.id}, (erro) => {
        if(erro) return response.status(400).json({
            error: true,
            message: "Error: O dado não foi removido!"
        });

        return response.json({
            error: false,
            message: "Dado removido com sucesso!"
        });
    });
});

app.listen(3333, () => {
    console.log("Servidor iniciado na porta 3333: http://localhost:3333/");
});

var myTim = setTimeout(function () {
    console.log("Top Chemistry Api: Funcionando!");
}, 500);