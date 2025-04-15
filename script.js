const listaTarefas = document.getElementById('lista-tarefas');
const form = document.getElementById('form-tarefa');
const input = document.getElementById('nova-tarefa');

// Função para salvar tarefas no localStorage
function salvarTarefas(tarefas) {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para carregar tarefas do localStorage
function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  listaTarefas.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.textContent = tarefa;

    const btn = document.createElement('button');
    btn.innerHTML = '🗑️';
    btn.onclick = () => deletarTarefa(index);

    li.appendChild(btn);
    listaTarefas.appendChild(li);
  });
}

// Adiciona nova tarefa
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) return;

  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.push(titulo);
  salvarTarefas(tarefas);

  input.value = '';
  carregarTarefas();
});

// Deleta uma tarefa
function deletarTarefa(index) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.splice(index, 1);
  salvarTarefas(tarefas);
  carregarTarefas();
}

// Inicializa a lista ao abrir a página
carregarTarefas();
