<template>
  <div class="session h-100 d-flex justify-content-center align-items-center text-center">
    <Login v-if="session"/>
    <Signup v-else/>
  </div>
</template>

<script>
import { ref,provide} from 'vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import { mapState } from 'vuex'

export default {
  name:'Session',
  setup() {
      const session = ref(true);
      provide('session',session)

      return {
          session
      }
  },
  computed:{
    ...mapState(['user'])
  },
  components: {
      Login,
      Signup
  }
}
</script>

<style>
.session {
  background-image: url(https://images.pexels.com/photos/1144687/pexels-photo-1144687.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500);
  background-position: center center;
  background-repeat: repeat;
}
</style>