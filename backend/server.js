require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Produto = require('./models/Produto'); // Importando o modelo que acabamos de criar

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite o servidor entender os dados enviados no formato JSON

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));




app.get('/api/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find(); 
    res.json(produtos); // Envia a lista de produtos como resposta
  } catch (error) {
    console.log("erro do banco de dados:", error);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});


app.post('/api/produtos', async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    const produtoSalvo = await novoProduto.save(); // Salva no MongoDB
    res.status(201).json(produtoSalvo);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao cadastrar produto' });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});