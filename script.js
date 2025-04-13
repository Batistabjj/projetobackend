const API_URL = 'http://localhost:3000/tasks';

const listaTarefas = document.getElementById('lista-tarefas');
const form = document.getElementById('form-tarefa');
const input = document.getElementById('nova-tarefa');

// Carrega todas as tarefas ao abrir a página
function carregarTarefas() {
  fetch(API_URL)
    .then(res => res.json())
    .then(tarefas => {
      listaTarefas.innerHTML = ''; // Limpa a lista antes de adicionar as tarefas
      tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.textContent = tarefa.title;

        const btn = document.createElement('button');
        btn.innerHTML = '🗑️';
        btn.onclick = () => deletarTarefa(tarefa.id); // Chama a função de deletar

        li.appendChild(btn);  // Adiciona o botão de deletar na tarefa
        listaTarefas.appendChild(li);  // Adiciona a tarefa na lista
      });
    })
    .catch(error => {
      console.error('Erro ao carregar tarefas:', error); // Exibe o erro no console
    });
}

// Adiciona nova tarefa ao enviar o formulário
form.addEventListener('submit', e => {
  e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

  const title = input.value.trim(); // Pega o valor da tarefa
  if (!title) return; // Se não houver título, não envia nada

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })  // Envia a nova tarefa para o servidor
  })
  .then(res => res.json()) // Aguarda a resposta do servidor
  .then(novaTarefa => {
    console.log('Tarefa criada:', novaTarefa); // Log para depuração

    input.value = '';  // Limpa o campo de entrada
    const li = document.createElement('li');
    li.textContent = novaTarefa.title;

    const btn = document.createElement('button');
    btn.innerHTML = '🗑️';
    btn.onclick = () => deletarTarefa(novaTarefa.id); // Chama a função de deletar

    li.appendChild(btn); // Adiciona o botão de deletar na nova tarefa
    listaTarefas.appendChild(li); // Adiciona a nova tarefa na lista
  })
  .catch(error => {
    console.error('Erro ao adicionar tarefa:', error); // Exibe o erro no console
  });
});

// Deleta uma tarefa
function deletarTarefa(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (res.ok) {
      console.log(`Tarefa com id ${id} deletada com sucesso.`);
      carregarTarefas(); // Recarrega as tarefas depois de deletar
    } else {
      throw new Error('Falha ao deletar tarefa');
    }
  })
  .catch(error => {
    console.error('Erro ao deletar tarefa:', error); // Exibe o erro no console
  });
}

// Inicializa
carregarTarefas();
