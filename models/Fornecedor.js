const mongoose = require('mongoose')

const { Schema } = mongoose

const fornecedorSchema = new Schema({
    cnpj: String,
    nome: String,
    nomeFantasia: String,
    descricao: String,
    inativo:  { type: Boolean, default: 'false' },
},
{collection: 'fornecedores'})

const Fornecedor = mongoose.model('Fornecedor', fornecedorSchema);

module.exports = Fornecedor