const { verifyToken } = require('../middlewares/access.middleware');
const { getTodos, addTodo, deleteAllTodos, deleteTodo, statusChangeTodo } = require('../middlewares/todo.middleware');

const route = require('express').Router();

route.get('/todos',verifyToken,getTodos)

route.post('/addtodo',verifyToken,addTodo)
route.post('/deletetodo',verifyToken,deleteTodo)
route.post('/deletealltodos',verifyToken,deleteAllTodos)
route.post('/changestatustodo',verifyToken,statusChangeTodo)

module.exports = route;