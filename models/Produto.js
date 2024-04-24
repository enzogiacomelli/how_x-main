const mongoose = require('mongoose')
const { Schema } = mongoose

const produtoSchema = new Schema({
    codigoBarras: String,    
    nomeProduto: String,
    descricao: String,
    especificacao: [Schema.Types.Mixed],
    fornecedor: { type: 'ObjectId', ref: 'Fornecedor'},
    inativo:  { type: Boolean, default: 'false' },
}
,{ collection: 'produtos'})

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto