const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

// Datos simulados
let todos = [
    { id: 1, tarea: 'Preparar la clase' },
    { id: 2, tarea: 'Pasar la lista de asistencia' },
    { id: 3, tarea: 'Impartir la clase frente al grupo' },
    { id: 4, tarea: 'Revisar las actividades de aprendizaje de los alumnos' },
    { id: 5, tarea: 'Generar las calificaciones' },
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
        tarea: req.body.tarea
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
    todo.tarea = req.body.tarea;
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
    console.log('API conectada en http://localhost:${port}');
});