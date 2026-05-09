// src/Admin.jsx
import { useState } from 'react';
import './App.css';

function Admin() {
  const [mensagem, setMensagem] = useState('');
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    unidade: 'un', // Valor padrão
    setor: '',
    categoria: ''
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const cadastrarProduto = async (e) => {
    e.preventDefault(); // Evita que a página recarregue

    try {
      const resposta = await fetch('https://cantinho-do-pao-app.onrender.com/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });

      if (resposta.status === 201) {
        setMensagem('✅ Produto cadastrado com sucesso!');
        // Limpa o formulário
        setProduto({ nome: '', preco: '', unidade: 'un', setor: '', categoria: '' });
        // Apaga a mensagem após 3 segundos
        setTimeout(() => setMensagem(''), 3000);
      }
    } catch (erro) {
      setMensagem('❌ Erro ao cadastrar o produto.');
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>⚙️ Gerência - Cantinho do Pão</h1>
        <p>Cadastro de Novos Produtos</p>
      </header>

      <form className="admin-form" onSubmit={cadastrarProduto}>
        <div className="form-group">
          <label>Nome do Produto:</label>
          <input type="text" name="nome" value={produto.nome} onChange={handleChange} required placeholder="Ex: Pão de Leite" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Preço (R$):</label>
            <input type="number" step="0.01" name="preco" value={produto.preco} onChange={handleChange} required placeholder="Ex: 15.90" />
          </div>
          <div className="form-group">
            <label>Unidade de Medida:</label>
            <select name="unidade" value={produto.unidade} onChange={handleChange}>
              <option value="un">Unidade (un)</option>
              <option value="kg">Quilo (kg)</option>
              <option value="g">Grama (g)</option>
              <option value="L">Litro (L)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Categoria:</label>
          <input type="text" name="categoria" value={produto.categoria} onChange={handleChange} required placeholder="Ex: Pães, Frios, Bebidas..." />
        </div>

        <div className="form-group">
          <label>Setor / Localização na loja:</label>
          <input type="text" name="setor" value={produto.setor} onChange={handleChange} required placeholder="Ex: Estufa Quente, Corredor 2..." />
        </div>

        <button type="submit" className="btn-salvar">Salvar Produto</button>
        
        {mensagem && <p className="mensagem-alerta">{mensagem}</p>}
      </form>
    </div>
  );
}

export default Admin;