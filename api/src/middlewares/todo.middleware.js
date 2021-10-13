const userModel = require("../models/user.model")
const moment = require('moment')
moment.locale('es-mx');

const getTodos = async (req, res) => {
    const {_id} = req.body;
    const {todos} = await userModel.findById(_id)
    res.json({
        data: todos,
        error: false
    })
}

const addTodo = async (req, res) => {
    const {_id, name} = req.body;
    const user = await userModel.findById(_id);

    const repeat = user.todos.filter((todo) => todo.name === name);

    if (repeat.length > 0) return res.status(401).json({
        data: user.todos,
        message: 'todo existing',
        error: false
    })

    user.todos.push({
        name,
        day: moment(Date.now()).format('L'),
        hour: moment(Date.now()).format('LTS')
    })

    const {todos} = await user.save();

    res.json({
        data: todos,
        message: 'Todo Save',
        error: false
    })
}

const deleteTodo = async (req, res) => {
    /*
        _id: es el id de usuario
        id: es el id del todo
    */
    const {_id, id} = req.body;
    const user = await userModel.findById(_id);

    user.todos = await user.todos.filter(todo => todo._id != id);
    const {todos} = await user.save()

    res.json({
        data: todos,
        error: false
    })
}

const statusChangeTodo = async (req, res) => {
    /*
        _id: es el id de usuario
        id: es el id del todo
    */
    const {_id, id} = req.body;
    const user = await userModel.findById(_id);
    
    user.todos = await user.todos.map(todo => {
        if(todo._id == id){
            todo.completed = !todo.completed;
            return todo
        }
        return todo
    });
    const {todos} = await user.save()
    res.json({
        data: todos,
        error: false
    })
}

const deleteAllTodos = async (req, res) => {
    const {_id} = req.body

    const user = await userModel.findById(_id);

    user.todos = [];
    const {todos} = await user.save();

    res.json({
        data: todos,
        error: false
    })
}

module.exports = {
    getTodos,
    addTodo,
    deleteAllTodos,
    deleteTodo,
    statusChangeTodo
}
