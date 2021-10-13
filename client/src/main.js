import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './bootstrap.min.css'
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import PrimeVue from 'primevue/config';

store.dispatch('getUser',JSON.parse(localStorage.getItem('user')) || null);
store.dispatch('DarkMode',JSON.parse(localStorage.getItem('darkmode')) || false);

createApp(App).use(PrimeVue,{ripple: true}).use(store).use(router).mount('#app')
