import { Routes, Route } from 'react-router-dom';
import Terminal from './Terminal'; // O nome do seu arquivo do caixa
import Admin from './Admin';       // O nome do seu arquivo do painel

function App() {
  return (
    <Routes>
      {/* Rota principal: Quando acessar /, abre o caixa */}
      <Route path="/" element={<Terminal />} />
      
      {/* Rota do painel: Quando acessar /admin, abre o admin */}
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;