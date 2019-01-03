import { createApp } from './client/main.js'

// client-specific bootstrapping logic...
// const router = createRouter();
const { app } = createApp()

// this assumes App.vue template root element has `id="app"`
app.$mount('#app')
