import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: [],
    darkmode: false
  },
  mutations: {
    Add(store,todo){
      store.todos.push(todo)
      localStorage.setItem('todos',JSON.stringify(store.todos));
    },
    Completed(store,index){
      store.todos[index].completed = !store.todos[index].completed;
      localStorage.setItem('todos',JSON.stringify(store.todos));
    },
    Delete(store,index){
      const newListTodos = store.todos.filter((todo,i)=> i != index);
      store.todos = newListTodos;
      localStorage.setItem('todos',JSON.stringify(newListTodos));
    },
    RemoveAll(store){
      localStorage.setItem('todos',JSON.stringify([]));
    },
    Set(store,filter){
      store.todos = filter
    },
    Dark(store,value){
      store.darkmode = value;
      localStorage.setItem('darkmode',value)
    }
  },
  actions: {
    AddTodo({commit},todo){
      commit('Add',todo)
    },
    CompletedTodo({commit},index){
      commit('Completed',index)
    },
    SetTodos({commit},todos){
      commit('Set',todos)
    },
    DeleteTask({commit},index){
      commit('Delete',index)
    },
    Filter({commit},type){
      const todos = JSON.parse(localStorage.getItem('todos'));

      switch (type) {
        case 'all':
          commit('Set',todos);
          break;
        case 'completed':
          const completed = todos.filter(todo => todo.completed)
          commit('Set',completed);
          break;
        case 'active':
          const active = todos.filter(todo => !todo.completed)
          commit('Set',active);
          break;
      }
    },
    CleanAll({commit}){
      commit('RemoveAll',[]);
    },
    DarkMode({commit},value){
      commit('Dark',value)
    }
  },
  modules: {
  }
})
