<template>
<div :class="index == 0 ? 'rounded-top-y': '' " class="card todo bg-secondary d-flex flex-row justify-content-between align-items-center px-3">
    <div class="d-flex flex-row align-items-center">
        <button @click="DeleteTask({id: todo._id})" class="btn btn-secondary mx-1">X</button>
        <p :class="todo.completed ? 'text-decoration-line-through':''" class="text-white my-0">
            {{todo.name}}
        </p>
    </div>
    <div class="form-check form-switch ">
        <input :style="{'height':'22px','width':'45px'}" class="form-check-input rounded-x-y" type="checkbox" id="flexSwitchCheckChecked" v-model="todo.completed" @click="CompletedTodo({id: todo._id})">
    </div>
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    props: {
        todo: {
            type: Object
        },
        index: {
            type: Number
        }
    },
    methods: {
        ...mapActions(['CompletedTodo','DeleteTask'])
    }
}
</script>

<style>
.rounded-x-y{
  border-radius: 10px;
}
</style>