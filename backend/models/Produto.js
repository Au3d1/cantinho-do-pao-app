const mongoose = require('mongoose');

// Criando o "molde" de como um produto deve ser salvo no banco
const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  unidade: { type: String, required: true }, // ex: "kg" ou "un"
  setor: { type: String, required: true },   // ex: "Balcão Principal"
  categoria: { type: String, required: true } // ex: "Pães"
});

// Exportando o modelo para podermos usar no servidor
module.exports = mongoose.model('Produto', ProdutoSchema);