import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "./assets/logo.png";
import user from "./assets/user.png";
import "./style.css";
import carteira from "./assets/carteira.png";
import SaldoTotal from "./pages/saldoTotal";
import Login from "./pages/login";

function Dashboard({ role, onLogout }) {
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);
  
  // 1. NOVO ESTADO: Controla se o menu do usuário está aberto ou fechado
  const [menuUsuarioAberto, setMenuUsuarioAberto] = useState(false);

  const isReadOnly = role === 'produtor';

  // Dados Mockados
  const dadosTransactions = [
    {
      id: 1,
      data: "15/12/25",
      valor: "R$ 799,87",
      descricao: "Compra de Insumos Agrícolas",
      tipo: "E",
      dedutivel: "SIM",
      produtos: [{ nome: "Saco de Adubo NPK", valor: "R$ 299,87" }, { nome: "Sementes de Milho", valor: "R$ 500,00" }],
    },
    {
      id: 2,
      data: "14/12/25",
      valor: "R$ 86,99",
      descricao: "Manutenção Trator",
      tipo: "S",
      dedutivel: "NÃO",
      produtos: [{ nome: "Troca de Óleo", valor: "R$ 86,99" }],
    },
  ];

  const abrirModal = (transacao) => setTransacaoSelecionada(transacao);
  const fecharModal = () => setTransacaoSelecionada(null);
  const toggleMenuUsuario = () => {
    setMenuUsuarioAberto(!menuUsuarioAberto);
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src={logo} alt="logo" className="logo-image"/>
          <h1 className="text-logo">Agro Pops <br /> Bello</h1>
        </div>

        {/* 2. MENU DE USUÁRIO */}
        <div className="logout-container">
            <button onClick={toggleMenuUsuario} className="logout-btn" title="Menu do Usuário">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
            </button>
            {menuUsuarioAberto && (
                <div className="user-menu-dropdown">
                    {/* Item 1: Editar (Por enquanto apenas visual) */}
                    <button className="user-menu-item" onClick={() => alert("Ir para Edição de Perfil")}>
                        Editar Perfil
                    </button>
                    
                    {/* Item 2: Sair (Chama o onLogout) */}
                    <button className="user-menu-item btn-sair-menu" onClick={onLogout}>
                        Sair
                    </button>
                </div>
            )}

        </div>
      </header>
      <div className="financeiro-logo">
        <h2>FINANCEIRO</h2>
        <img src={carteira} alt="Logo Financeiro" />
      </div>

      <div className="financeiro">
        <div className="card card-top">
            <h3>Saldo Total</h3>
            <span className="valor">R$ 0,00</span>
            <Link to="/saldo-total" style={{ display: "flex", justifyContent: "center", textDecoration: "none" }}>
                <button>ACESSAR</button>
            </Link>
        </div>
        <div className="card card-top">
          <h3>Entradas</h3>
          <span className="valor">R$ 0,00</span>
          <button>ACESSAR</button>
        </div>
        <div className="card card-top">
          <h3>Saídas</h3>
          <span className="valor">R$ 0,00</span>
          <button>ACESSAR</button>
        </div>
        <div className="card">
          <h3>Dedutível</h3>
          <span className="valor">R$ 0,00</span>
          <button>ACESSAR</button>
        </div>
        <div className="card">
          <h3>Não dedutível</h3>
          <span className="valor">R$ 0,00</span>
          <button>ACESSAR</button>
        </div>
      </div>

      <div className="relatorio-section">
        <h2>RELATÓRIO POR PERÍODO</h2>
        <div className="card-branco">
          <div className="relatorio-header">
            <div className="filtros">
              <div className="filtro-item"><label>Mês</label><select><option>Todos</option></select></div>
              <div className="filtro-item"><label>Ano</label><select><option>2025</option></select></div>
              <button className="btn-gerar">GERAR</button>
      
              {!isReadOnly && (
                 <button className="btn-gerar" style={{ marginLeft: 'auto', backgroundColor: '#e65100' }}>+ NOVA</button>
              )}
            </div>
          </div>

          <div className="tabela-scroll">
            <div className="tabela">
              <div className="tabela-header">
                <div className="col check">
                    <input type="checkbox" disabled={isReadOnly} />
                </div>
                
                <div className="col">Data</div>
                <div className="col">Valor</div>
                <div className="col">Descrição</div>
                <div className="col">Tipo</div>
                <div className="col">Dedutível</div>
                
                <div className="col">Ações</div>
              </div>

              {dadosTransactions.map((item) => (
                <div key={item.id} className="tabela-row row-clicavel" onClick={() => abrirModal(item)}>
                  
                  <div className="col check" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" disabled={isReadOnly} />
                  </div>

                  <div className="col">{item.data}</div>
                  <div className="col">{item.valor}</div>
                  <div className="col">{item.descricao}</div>
                  <div className="col">{item.tipo}</div>
                  <div className="col">{item.dedutivel}</div>
                  
                  <div className="col acoes">...</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {transacaoSelecionada && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalhes</h3>
              <button className="close-btn" onClick={fecharModal}>&times;</button>
            </div>
            <div className="modal-body">
               <div className="info-grid">
                  <div><strong>Data:</strong> <p>{transacaoSelecionada.data}</p></div>
                  <div><strong>Valor:</strong> <p className="destaque-valor">{transacaoSelecionada.valor}</p></div>
                  <div><strong>Tipo:</strong> <p>{transacaoSelecionada.tipo === 'E' ? 'Entrada' : 'Saída'}</p></div>
                  <div><strong>Dedutível:</strong> <p>{transacaoSelecionada.dedutivel}</p></div>
               </div>
               <div className="descricao-full"><strong>Descrição:</strong><p>{transacaoSelecionada.descricao}</p></div>
               
               <div className="lista-produtos-section">
                <h4>Itens</h4>
                <ul className="lista-produtos">
                  {transacaoSelecionada.produtos.map((prod, i) => (
                    <li key={i}><span>{prod.nome}</span><span>{prod.valor}</span></li>
                  ))}
                </ul>
               </div>
            </div>

            <div className="modal-footer">
              {!isReadOnly ? (
                <>
                  <button className="btn-editar">Editar</button>
                  <button className="btn-excluir">Excluir</button>
                </>
              ) : (
                <button className="btn-editar" onClick={fecharModal}>Fechar</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            userRole ? (
              <Dashboard role={userRole} onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        <Route path="/saldo-total" element={<SaldoTotal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;