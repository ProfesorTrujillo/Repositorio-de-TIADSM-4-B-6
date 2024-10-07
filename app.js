const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON

// Datos simulados
let todos = [
    { id: 1, task: 'Preparar la clase' },
    { id: 2, task: 'Pasar la lista de asistencia' },
    { id: 3, task: 'Impartir la clase frente al grupo' },
    { id: 4, task: 'Revisar las actividades de aprendizaje de los alumnos' },
    { id: 5, task: 'Generar las calificaciones' },
];

// GET: Obtener todas las tareas
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET: Obtener una tarea por ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).send('Tarea no encontrada');
    }
    res.json(todo);
});

// POST: Crear una nueva tarea
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT: Actualizar una tarea existente
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).send('Tarea no encontrada');
    }
    todo.task = req.body.task;
    res.json(todo);
});

// DELETE: Eliminar una tarea por ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
        return res.status(404).send('Tarea no encontrada');
    }
    todos.splice(todoIndex, 1);
    res.status(204).send(); // No devuelve contenido
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
