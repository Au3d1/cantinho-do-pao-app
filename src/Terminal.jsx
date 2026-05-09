import { useState, useEffect } from 'react';
import './App.css';
import logoCantinho from './assets/logo.png';
function Terminal() {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  
  // 1. O estado agora começa vazio!
  const [produtos, setProdutos] = useState([]); 

  // 2. useEffect vai na API buscar os dados assim que a tela abre
  useEffect(() => {
    fetch('https://cantinho-do-pao-app.onrender.com/api/produtos')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setProdutos(dados); // Guarda os produtos que vieram do MongoDB
      })
      .catch((erro) => console.error("Erro ao conectar com a API:", erro));
  }, []);

  // Cria os botões de categoria com base no que veio do banco
  const categorias = ['Todas', ...new Set(produtos.map((p) => p.categoria))];

  const produtosFiltrados = produtos.filter((produto) => {
    const matchBusca = produto.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === 'Todas' || produto.categoria === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <img src={logoCantinho} alt="Logo Cantinho do Pão" className="logo-img" />
          <h1>Cantinho do Pão</h1>
        </div>
        <p>Terminal de Consulta Rápida</p>
      </header>

      <main className="main-content">
        <div className="search-box">
          <input
            type="text"
            placeholder="O que você está procurando? (Ex: Pão, Queijo...)"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="categories-container">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${categoriaAtiva === cat ? 'active' : ''}`}
              onClick={() => setCategoriaAtiva(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="results-container">
          {busca === '' && categoriaAtiva === 'Todas' ? (
            <p className="instrucao">Digite o nome do produto ou toque em uma categoria acima.</p>
          ) : produtosFiltrados.length > 0 ? (
            <ul className="product-list">
              {produtosFiltrados.map((produto) => (
                
                <li key={produto._id} className="product-card">
                  <div className="product-info">
                    <h2>{produto.nome}</h2>
                    <span className="categoria-tag">{produto.categoria}</span>
                  </div>
                  <div className="product-details">
                    <p className="price">
                      R$ {produto.preco.toFixed(2)} <span className="unit">/{produto.unidade}</span>
                    </p>
                    <p className="location">📍 <strong>Onde encontrar:</strong> {produto.setor}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="not-found">Nenhum produto encontrado.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Terminal;