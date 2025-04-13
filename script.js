const API_URL = 'http://localhost:3000/tasks';

const listaTarefas = document.getElementById('lista-tarefas');
const form = document.getElementById('form-tarefa');
const input = document.getElementById('nova-tarefa');

// Carrega todas as tarefas ao abrir a página
function carregarTarefas() {
  fetch(API_URL)
    .then(res => res.json())
    .then(tarefas => {
      listaTarefas.innerHTML = '';
      tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.textContent = tarefa.title;

        const btn = document.createElement('button');
        btn.innerHTML = '🗑️';
        btn.onclick = () => deletarTarefa(tarefa.id);

        li.appendChild(btn);
        listaTarefas.appendChild(li);
      });
    });
}

// Adiciona nova tarefa ao enviar o formulário
form.addEventListener('submit', e => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  .then(() => {
    input.value = '';
    carregarTarefas();
  });
});

// Deleta uma tarefa
function deletarTarefa(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(() => carregarTarefas());
}

// Inicializa
carregarTarefas();
