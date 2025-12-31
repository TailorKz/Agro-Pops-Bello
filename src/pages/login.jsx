import React, { useState } from 'react';
import logo from '../assets/logo.png'; 
import './Login.css'; // <--- AQUI ESTAVA O ERRO, AGORA ESTÁ CORRIGIDO

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario === 'admin' && senha === '123') {
      onLogin('admin');
    } else if (usuario === 'produtor' && senha === '123') {
      onLogin('produtor');
    } else {
      setErro('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Agro POPs Bello" className="login-logo" />
          <h2>Bem-vindo</h2>
          <p>Faça login para acessar sua gestão</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Usuário</label>
            <input 
              type="text" 
              placeholder="Digite seu usuário" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="Digite sua senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && <span className="msg-erro">{erro}</span>}

          <button type="submit" className="btn-login">ENTRAR</button>
        </form>

        <div className="login-footer">
          <p>Esqueceu sua senha? <a href="#">Recuperar</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;