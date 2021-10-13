<template>
    <Card class="col-sm-10 col-md-8 col-lg-5 p-3 mt-5">
        <!-- <template #header>
            <Message severity="success" :life="2000" :sticky="false">This message will hide in 2 seconds.</Message>
        </template> -->
        <template #title>
            <p class="display-5">Log in </p>
            <p>to your account</p>
        </template>
        <template #content>
            <InputText type="emaild" v-model="login.email" class="col-12 mt-3" placeholder="Email"/>
            <InputText type="password" v-model="login.password" class="col-12 mt-3" placeholder="Password"/>
            <p class="text-danger mt-4" v-if="error">{{error}}</p>
        </template>
        <template #footer>
            <Button 
                @click="Login(login)" 
                icon="pi pi-user" 
                label="Log in" 
                :loading="loading"
            />
            <br>
            <Button @click="session = !session" label="You are not registered yet?" class="p-button-link mt-2" />
        </template>
    </Card>
</template>

<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
// import Message from 'primevue/message'
import { inject } from 'vue'
import { mapActions, mapState } from 'vuex'

export default {
    setup(){
        const session = inject('session')
        return{
            session
        }
    },
    data() {
        return {
            login: {
                email:'',
                password: ''
            }
        }
    },
    components: {
        InputText,
        Button,
        Card,
        // Message
    },
    computed: {
        ...mapState(['loading','error'])
    },
    methods: {
        ...mapActions(['Login'])
    }
}
</script>