import { createStore } from 'vuex'
import route from '../router/index'

export default createStore({
  state: {
    todos: [],
    darkmode: false,
    loading: false,
    user: null,
    error: null
  },
  mutations: {
    Set(state,todos){
      state.todos = todos
    },
    Dark(state,value){
      state.darkmode = value;
      localStorage.setItem('darkmode',value)
    },
    Loading(state,loading){
      state.loading = loading
    },
    User(state,user){
      state.user = user
    }
  },
  actions: {
    async AddTodo({commit,state},payload){

      const res = await fetch('https://apitodoapp.herokuapp.com/addtodo',{
        method: 'POST',
        headers: {
          'auth-token': state.user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const todos = await res.json()
      commit('Set',todos.data)
    },
    async CompletedTodo({commit,state},payload){
      try {
        const res = await fetch('https://apitodoapp.herokuapp.com/changestatustodo',{
          method: 'POST',
          headers: {
            'auth-token': state.user.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        const todos = await res.json()
        commit('Set',todos.data)
      } catch (error) {
        
      }
    },
    async SetTodos({commit},token){
      try {
        const res = await fetch('https://apitodoapp.herokuapp.com/todos',{
          method: 'GET',
          headers: {
            'auth-token': token,
            'Content-Type': 'application/json',
          }
        });

        const todos = await res.json()
        commit('Set',todos.data)
      } catch (error) {
        
      }
    },
    async DeleteTask({commit,state},payload){
      const res = await fetch('https://apitodoapp.herokuapp.com/deletetodo',{
        method: 'POST',
        headers: {
          'auth-token': state.user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      const todos = await res.json()
      commit('Set',todos.data);
    },
    async Filter({commit,state},type){
      const res = await fetch('https://apitodoapp.herokuapp.com/todos',{
        method: 'GET',
        headers: {
          'auth-token': state.user.token,
          'Content-Type': 'application/json',
        }
      });

      const {data:todos} = await res.json()
      switch (type) {
        case 'all':
          commit('Set',todos);
          break;
        case 'completed':
          const completed = await todos.filter(todo => todo.completed)
          commit('Set',completed);
          break;
        case 'active':
          const active = await todos.filter(todo => !todo.completed)
          commit('Set',active);
          break;
      }
    },
    async CleanAll({commit,state}){
      try {
        const res = await fetch('https://apitodoapp.herokuapp.com/deletealltodos',{
          method: 'POST',
          headers: {
            'auth-token': state.user.token,
            'Content-Type': 'application/json',
          },
        })
        
        const user = await res.json();
        commit('Set',user.data)
      } catch (error) {
        
      }
    },

    //Modo de la pagina
    DarkMode({commit},value){
      commit('Dark',value)
    },

    // Tratado de datos del usuario
    getUser({commit},payload){
      commit('User',payload)
    },
    async Login({commit},payload){
      commit('Loading', true)
      try {
        const res = await fetch('https://apitodoapp.herokuapp.com/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
        const user = await res.json();
        
        if(user.data){
          localStorage.setItem('user',JSON.stringify(user.data))
          commit('User',user.data)
          
          route.push('/todos')
        }else{
          this.state.error = user.message
        }
        
      } catch (error) {
        
      }
        commit('Loading', false)
    },
    async Signup({commit},payload){
      commit('Loading', true)

      const res = await fetch('https://apitodoapp.herokuapp.com/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // const user = await res.json();
        commit('Loading', false)
    },
    async Logout({commit}){
      localStorage.removeItem('user');
      commit('User',null)
      route.push('/')
    }
  },
})
