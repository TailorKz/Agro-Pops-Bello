import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "./assets/logo.png";
import "./style.css";
import carteira from "./assets/carteira.png";
import SaldoTotal from "./pages/saldoTotal";

function Dashboard() {
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

  // 2. Dados de Exemplo (Simulando seu banco de dados)
  const dadosTransactions = [
    {
      id: 1,
      data: "15/12/25",
      valor: "R$ 799,87",
      descricao: "Compra de Insumos Agrícolas",
      tipo: "E",
      dedutivel: "SIM",
      produtos: [
        { nome: "Saco de Adubo NPK", valor: "R$ 299,87" },
        { nome: "Sementes de Milho", valor: "R$ 500,00" },
      ],
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
    {
      id: 3,
      data: "09/11/25",
      valor: "R$ 999,50",
      descricao: "Venda de Safra (Parcial)",
      tipo: "E",
      dedutivel: "?",
      produtos: [{ nome: "Soja (Saca)", valor: "R$ 999,50" }],
    },
  ];

  const abrirModal = (transacao) => {
    setTransacaoSelecionada(transacao);
  };

  const fecharModal = () => {
    setTransacaoSelecionada(null);
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>
            Agro Pops <br /> Bello
          </h1>
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
          <Link
            to="/saldo-total"
            style={{
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
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
              <div className="filtro-item">
                <label>Mês</label>
                <select name="mes">
                  <option>Todos</option>
                </select>
              </div>
              <div className="filtro-item">
                <label>Ano</label>
                <select name="ano">
                  <option>2025</option>
                </select>
              </div>
              <button className="btn-gerar">GERAR</button>
            </div>
          </div>

          <div className="tabela-scroll">
            <div className="tabela">
              <div className="tabela-header">
                <div className="col check">
                  <input type="checkbox" />
                </div>
                <div className="col">Data</div>
                <div className="col">Valor</div>
                <div className="col">Descrição</div>
                <div className="col">Tipo</div>
                <div className="col">Dedutível</div>
                <div className="col">Ações</div>
              </div>

              {dadosTransactions.map((item) => (
                <div
                  key={item.id}
                  className="tabela-row row-clicavel"
                  onClick={() => abrirModal(item)}
                >
                  <div
                    className="col check"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input type="checkbox" />
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

      {/* ---  MODAL --- */}
      {transacaoSelecionada && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalhes da Transação</h3>
              <button className="close-btn" onClick={fecharModal}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="info-grid">
                <div>
                  <strong>Data:</strong> <p>{transacaoSelecionada.data}</p>
                </div>
                <div>
                  <strong>Valor Total:</strong>{" "}
                  <p className="destaque-valor">{transacaoSelecionada.valor}</p>
                </div>
                <div>
                  <strong>Tipo:</strong>{" "}
                  <p>
                    {transacaoSelecionada.tipo === "E" ? "Entrada" : "Saída"}
                  </p>
                </div>
                <div>
                  <strong>Dedutível:</strong>{" "}
                  <p>{transacaoSelecionada.dedutivel}</p>
                </div>
              </div>

              <div className="descricao-full">
                <strong>Descrição:</strong>
                <p>{transacaoSelecionada.descricao}</p>
              </div>

              {/* Lista de sub-produtos dentro da nota */}
              <div className="lista-produtos-section">
                <h4>Itens / Produtos</h4>
                <ul className="lista-produtos">
                  {transacaoSelecionada.produtos.map((prod, index) => (
                    <li key={index}>
                      <span>{prod.nome}</span>
                      <span>{prod.valor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-editar">Editar</button>
              <button className="btn-excluir">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/saldo-total" element={<SaldoTotal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
