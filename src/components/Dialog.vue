<template>
<Dialog header="Todo" v-model:visible="display" :style="{width: '50vw'}" :modal="true">
    <InputText type="text" v-model="todo" :style="{width: '100%'}" placeholder="Insert name todo"/>

    <template #footer>
    <button 
        @click="()=>{
            AddTodo({
                title: todo,
                completed: false
            });
            display = false;
            todo = '';
        }" 
        class="btn btn-secondary" 
        :style="{'border-radius': '3px'}">
        Agregar
    </button>
    <button @click="display = !display" class="btn btn-danger" :style="{'border-radius': '3px'}">Cerrar</button>
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
    setup() {
        const display = inject('display');

        return {
            display,
            todo: '',
        }
    },
    methods: {
        ...mapActions(['AddTodo'])
    }
}
</script>

<style>

</style>