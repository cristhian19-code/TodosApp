<template>
  <div class="todos">
    <div 
      :style="
        darkmode 
        ? {'background-image': 'url(https://images.pexels.com/photos/3473569/pexels-photo-3473569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)'}
        : {'background-image': 'url(https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)'}
        "
      class="img-todo"
    >
      <div class="navbar fixed-top p-4 d-flex justify-content-between align-items-center">
        <h1 class="text-white">{{user.name}}</h1>
        <div>
          <button v-if="darkmode" @click="DarkMode(!darkmode)" class="btn text-white">
            <i class="fas fa-sun"></i>
          </button>
          <button v-else @click="DarkMode(!darkmode)" class="btn text-white">
            <i class="fas fa-moon"></i>
          </button>

          <button @click="Logout()" class="btn text-white">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid py-5">
      <div class="d-flex flex-column align-items-center">
        <div class="card mb-3 bg-dark rounded-x-y d-flex flex-row justify-content-center align-items-center">
          <button class="mx-2 btn rounded-circle" @click="display = !display">
            <i class="fas fa-plus text-white"></i>
          </button>
          <p class="text-white my-0">Create a new Todo</p>
        </div>
        
        <div class="container-todos d-flex flex-column align-items-center">
          <TodoVue v-for="(todo, index) in todos" :key="todo.title" :index="index" :todo="todo" />
        </div>

        <div class="card rounded-bottom-y bg-secondary d-flex flex-row justify-content-between align-items-center px-3">
          <div>
            <p v-if="todos" class="text-muted my-0">{{todos.filter((todo) => todo.completed).length}} elements completed</p>
          </div>
          <div class="d-flex justify-content-center" v-if="windowWidth>1000">
            <button @click="Filter('all')" class="btn btn-secondary text-white">All</button>
            <button @click="Filter('completed')" class="btn btn-secondary text-white">Completed</button>
            <button @click="Filter('active')" class="btn btn-secondary text-white">Not Completed</button>
          </div>
          <div>
            <button @click="CleanAll()" class="btn btn-secondary text-white">Clear All</button>
          </div>
        </div>

        <div v-if="windowWidth<=1000" class="card mt-3 d-flex flex-row justify-content-center bg-secondary rounded-x-y">
          <button @click="Filter('all')" class="btn btn-secondary text-white">All</button>
          <button @click="Filter('completed')" class="btn btn-secondary text-white">Completed</button>
          <button @click="Filter('active')" class="btn btn-secondary text-white">Not Completed</button>
        </div>
      </div>
      <DialogVue />
    </div>
  </div>
</template>

<script>

import TodoVue from '../components/Todo.vue';
import {mapState,mapActions} from 'vuex'
import DialogVue from '../components/Dialog.vue';
import { ref,provide } from 'vue';
import route from '../router'
export default {
  name: 'Home',
  components:{
    TodoVue,
    DialogVue
  },
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },
  setup() {
    const display = ref(false);
    provide('display',display);
    return {
      display,
    }
  },
  computed: {
    ...mapState(['todos','darkmode','user'])
  },
  methods: {
    ...mapActions(['CleanAll','Filter','DarkMode','SetTodos','Logout'])
  },
  mounted() {
      window.onresize = () => {
          this.windowWidth = window.innerWidth
      }
  },
  created() {
    if(this.user.token == ''){
      route.push('/')
    }else{
      this.SetTodos(this.user.token)
    }
  },
}
</script>
<style scoped>
.img-todo{
  background-size: cover;
  background-attachment: fixed;
  background-position: center bottom;
  background-repeat: no-repeat;
  transition: .5s ease-out;
  height: 60vh;
}

.btn{
  outline: none !important;
}

.h-per{
  height: 60px;
}

.card{
  width: 50%;
  height: 55px;
}

.todo{
  width: 100%;
}

.container-todos{
  width: 50%;
}

.rounded-x-y{
  border-radius: 10px;
}

.rounded-top-y{
  border-radius: 10px 10px 0 0;
}

.rounded-bottom-y{
  border-radius: 0 0 10px 10px;
}

.container-fluid{
  margin-top: -15rem;
}

.fa-sun,.fa-moon,.fa-sign-out-alt{
  font-size: 25px;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

@media (max-width: 1200px) {
  .todo,.card{
    width: 90%;
  }

  .container-todos{
    width: 100%;
  }
}

</style>