import { createApp } from 'vue';
import 'vfonts/Roboto.css';
import './style.css';
import App from './App.vue';
import router from './routes/index.js';

const app = createApp(App);
app.use(router);
app.mount('#app');
