// src/App.jsx
import Terminal from './Terminal';
import Admin from './Admin';

function App() {
  // Lê a URL que está no navegador
  const caminhoAtual = window.location.pathname;

  // Se a URL terminar em "/admin", mostra a tela de gerência
  if (caminhoAtual === '/admin') {
    return <Admin />;
  }

  // Se não (qualquer outra coisa), mostra o terminal limpo do cliente
  return <Terminal />;
}

export default App;