import { createApp } from 'vue'
import { createPinia } from 'pinia'  //this is needed to run pinia
import './style.css'
import App from './App.vue'


// this needs to be added to apply bootstrap to css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


//createApp(App).mount('#app')

// need this for pinia
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
