const mongoose = require('mongoose');

const TopChemistry = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

mongoose.model('topchemistry', TopChemistry);