<template>
<Dialog header="Todo" v-model:visible="display" :style="{width: '50vw'}" :modal="true">
    <InputText class="mt-3" type="text" v-model="todo" :style="{width: '100%'}" placeholder="Insert name todo" autofocus/>
    <template #footer>
    <button 
        @click="()=>{
            AddTodo({
                name: todo,
            });
            display = false;
            todo = '';
        }"
        :class="todo.length<4?'disabled':''"
        class="btn btn-primary" 
        :style="{'border-radius': '3px'}">
        Add
    </button>
    <button @click="display = !display" class="btn btn-text-danger" :style="{'border-radius': '3px'}">Cancel</button>
    </template>
</Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { inject } from 'vue';
import {mapActions} from 'vuex'

export default {
    components: {
        Dialog,
        InputText,
    },
    data() {
        return {
            todo: ''
        }
    },
    setup() {
        const display = inject('display');

        return {
            display,
        }
    },
    methods: {
        ...mapActions(['AddTodo'])
    }
}
</script>

<style>

</style>