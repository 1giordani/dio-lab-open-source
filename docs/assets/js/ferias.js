document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const userInput = document.getElementById('usuario');
  const registrationInput = document.getElementById('matricula');
  const message = document.getElementById('message');
  const result = document.getElementById('resultado');
  const employeeName = document.getElementById('employeeName');
  const rows = document.getElementById('vacationRows');
  const newSearch = document.getElementById('newSearch');

  const formatDate = (value) => new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
  const countDays = (start, end) => Math.round((new Date(end) - new Date(start)) / 86400000) + 1;

  function resetSearch() {
    result.hidden = true;
    form.hidden = false;
    form.reset();
    message.textContent = '';
    rows.replaceChildren();
    userInput.focus();
  }

  function renderVacation(record) {
    rows.replaceChildren();
    Object.entries(record.ferias).sort(([yearA], [yearB]) => yearA.localeCompare(yearB)).forEach(([year, period]) => {
      const row = document.createElement('tr');
      [year, formatDate(period.inicio), formatDate(period.fim), countDays(period.inicio, period.fim)].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      rows.appendChild(row);
    });
    employeeName.textContent = `Colaborador: ${record.usuario}`;
    form.hidden = true;
    result.hidden = false;
    result.focus();
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    message.textContent = 'Consultando…';
    try {
      const response = await fetch('assets/data/ferias.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const records = await response.json();
      const user = userInput.value.trim().toLocaleLowerCase('pt-BR');
      const registration = registrationInput.value.trim();
      const record = records.find((item) =>
        item.usuario.toLocaleLowerCase('pt-BR') === user && item.matricula === registration
      );
      if (!record) {
        message.textContent = 'Usuário ou matrícula não encontrados. Confira os dados de demonstração.';
        return;
      }
      message.textContent = '';
      renderVacation(record);
    } catch (error) {
      console.error(error);
      message.textContent = 'Não foi possível carregar os dados. Tente novamente.';
    }
  });

  newSearch.addEventListener('click', resetSearch);
});
