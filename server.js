const express = require('express');
const cors = require('cors'); // ← Adicionado aqui
const app = express();
const PORT = 3000;
app.use(cors()); // ← Ativa o CORS
app.use(express.json());

let tarefas = [];
let id = 1;

app.get('/tasks', (req, res) => {
  res.json(tarefas);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const novaTarefa = { id: id++, title };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.delete('/tasks/:id', (req, res) => {
  const idTarefa = parseInt(req.params.id);
  tarefas = tarefas.filter(tarefa => tarefa.id !== idTarefa);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
