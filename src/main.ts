import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Kongponents from '@kong/kongponents'
import App from './App.vue'
import router from './router'

// import AppLayout from '@kong-ui-public/app-layout'
// import '@kong-ui-public/app-layout/dist/style.css'
// app.use(AppLayout)

// Import Kongponents styles
import '@kong/kongponents/dist/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Install and register all Kongponents as a plugin
app.use(Kongponents)

app.mount('#app')
