<template>
    <Card class="col-sm-10 col-md-8 col-lg-5 p-3 mt-5">
        <template #title>
            <p class="display-5">Sign</p>
            <p>up for free</p>
        </template>
        <template #content>
            <InputText type="text" v-model="signup.firstname" class="col-12 mt-3" placeholder="Firstname"/>
            <InputText type="text" v-model="signup.lastname" class="col-12 mt-3" placeholder="Lastname"/>
            <InputText type="email" v-model="signup.email" class="col-12 mt-3" placeholder="Email"/>
            <InputText type="password" v-model="signup.password" class="col-12 mt-3" placeholder="Password"/>
        </template>
        <template #footer>
            <Button 
                @click="Signup(signup)"
                icon="pi pi-user" 
                label="Create account"
                :loading="loading"
            />
            <br>
            <Button @click="session = !session" label="Do you already have an account?" class="p-button-link mt-2" />
        </template>
    </Card>
</template>

<script>
import {inject} from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { mapActions, mapState } from 'vuex'

export default {
    data() {
        return {
            signup:{
                email: '',
                firstname: '',
                lastname: '',
                password: ''
            },
        }
    },
    setup(){
        const session = inject('session')
        return{
            session
        }
    },
    components: {
        InputText,
        Button,
        Card
    },
    computed: {
        ...mapState(['loading'])
    },
    methods: {
        ...mapActions(['Signup'])
    }
}
</script>

<style>

</style>