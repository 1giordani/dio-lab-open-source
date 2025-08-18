document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const usuarioInput = document.getElementById('usuario');
  const matriculaInput = document.getElementById('matricula');
  const message = document.getElementById('message');
  const tabelaSec = document.getElementById('tabelaFerias');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = '';

    const usuario = usuarioInput.value.trim().toLowerCase();
    const matricula = matriculaInput.value.trim();

    try {
      const response = await fetch('assets/data/ferias.json');
      const dados = await response.json();
      const registro = dados.find((r) => r.usuario.toLowerCase() === usuario && r.matricula === matricula);

      if (!registro) {
        message.textContent = 'Usuário ou matrícula inválidos.';
        return;
      }

      form.style.display = 'none';
      renderTable(registro.ferias);
    } catch (err) {
      console.error(err);
      message.textContent = 'Erro ao carregar dados de férias.';
    }
  });

  function renderTable(ferias) {
    const table = document.createElement('table');
    table.innerHTML = '<thead><tr><th>Ano</th><th>Início</th><th>Fim</th></tr></thead>';
    const tbody = document.createElement('tbody');
    Object.keys(ferias).forEach((ano) => {
      const { inicio, fim } = ferias[ano];
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${ano}</td><td>${inicio}</td><td>${fim}</td>`;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tabelaSec.appendChild(table);
  }
});
