// app.js

const designSystem = {
  colors: {
    gradientBg: 'linear-gradient(135deg, #0d2b45 0%, #154c60 40%, #006d77 75%, #1b4332 100%)',
    brandBlue: '#1565c0', 
    inputBg: '#f5f5f5',
    mutedText: '#b0bec5',
    linkBlue: '#1565c0',
    borderMuted: '#cccccc',
    errorRed: '#ef4444',
    successGreen: '#22c55e'
  }
};

// Injeção de CSS
const styles = document.createElement('style');
styles.innerHTML = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: ${designSystem.colors.gradientBg};
    background-attachment: fixed;
    color: #333333;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .container-geral {
    width: 100%;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .titulo-fora-app {
    color: #ffffff;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 6px;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  .subtitulo-fora-app {
    color: ${designSystem.colors.mutedText};
    font-size: 15px;
    margin-bottom: 28px;
    text-align: center;
  }

  .cadastro-box {
    background: white;
    padding: 40px 35px;
    border-radius: 32px;
    width: 100%;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pinguim-container {
    width: 130px;
    height: 130px;
    margin-bottom: 24px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .pinguim-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .custom-input {
    width: 100%;
    background-color: ${designSystem.colors.inputBg};
    border: 1px solid ${designSystem.colors.borderMuted};
    border-radius: 14px;
    padding: 16px;
    font-size: 14px;
    color: #333333;
    outline: none;
    transition: all 0.2s ease;
  }
  .custom-input:focus {
    border-color: ${designSystem.colors.brandBlue};
    background-color: #ffffff;
  }
  
  .input-error {
    border: 2px solid ${designSystem.colors.errorRed} !important;
    background-color: #fdf2f2;
  }

  .btn-submit {
    width: 100%;
    background-color: #1565c0;
    color: white;
    font-weight: 600;
    padding: 18px;
    border: none;
    border-radius: 9999px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 12px;
  }
  .btn-submit:active { background-color: #0d47a1; }

  .mensagem-erro {
    color: ${designSystem.colors.errorRed};
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    display: none;
    margin-top: 8px;
    width: 100%;
  }
  
  .mensagem-sucesso {
    color: ${designSystem.colors.successGreen};
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    display: none;
    margin-top: 8px;
    width: 100%;
  }
`;
document.head.appendChild(styles);

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `<div id="root" style="width:100%; display:flex; justify-content:center;"></div>`;
  const root = document.getElementById('root');

  function renderLoginScreen() {
    root.innerHTML = `
      <div class="container-geral">
        <h1 class="titulo-fora-app">Bem-vindo ao Penguinismo</h1>
        <p class="subtitulo-fora-app">Encontre o seu equilíbrio digital.</p>
        
        <div class="cadastro-box">
          <div class="pinguim-container">
            <img class="pinguim-img" alt="Penguin" src="img/an_edit_of_the_penguin_character_image._change_the_text_penguin_on_the_id_badge (1).png" onerror="this.src='https://placehold.co/130x130/e3f2fd/1565c0?text=🐧'">
          </div>

          <form id="form-login" style="width: 100%; display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label style="font-size: 14px; font-weight: 500; color: #4a4a4a;">Usuário</label>
              <input class="custom-input" id="username" placeholder="Ex: usua_gigi" type="text" required>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label style="font-size: 14px; font-weight: 500; color: #4a4a4a;">Senha</label>
              <input class="custom-input" id="password" placeholder="••••••••" type="password" required>
            </div>

            <div style="text-align: right;">
              <a href="#" style="font-size: 13px; color: #1565c0; text-decoration: none; font-weight: 500;">Esqueceu a senha?</a>
            </div>

            <div id="erro-login" class="mensagem-erro">❌ Usuário ou senha incorretos!</div>
            <div id="sucesso-login" class="mensagem-sucesso">✅ Login efetuado! Entrando...</div>

            <button class="btn-submit" type="submit">Entrar</button>
          </form>

          <p style="font-size: 14px; color: #666666; margin-top: 24px;">
            Não tem uma conta? <span id="ir-para-cadastro" style="color: #1565c0; font-weight: bold; cursor: pointer;">Cadastre-se</span>
          </p>
        </div>
      </div>
    `;
    setupEvents();
  }

  function setupEvents() {
    document.getElementById('ir-para-cadastro').addEventListener('click', () => {
      window.location.href = 'cadastro.html';
    });

    const form = document.getElementById('form-login');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const userInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');
      const erroTexto = document.getElementById('erro-login');
      const sucessoTexto = document.getElementById('sucesso-login');

      const userValue = userInput.value.trim().toLowerCase();
      const passwordValue = passwordInput.value;

      userInput.classList.remove('input-error');
      passwordInput.classList.remove('input-error');
      erroTexto.style.display = 'none';
      sucessoTexto.style.display = 'none';

      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userValue, senha: passwordValue })
      })
      .then(res => {
        if (!res.ok) throw new Error(); 
        return res.json();
      })
      .then(data => {
        if (data.sucesso) {
          sucessoTexto.style.display = 'block';
          setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        }
      })
      .catch(() => {
        userInput.classList.add('input-error');
        passwordInput.classList.add('input-error');
        erroTexto.style.display = 'block';
      });
    });
  }

  renderLoginScreen();
});