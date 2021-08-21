import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VeeValidate from './plugin/validation';
import { auth } from './firebase/firebase';
import './css/global.css';
import './assets/css/tailwind.css';
import './assets/css/main.css';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(store);
    app.use(router);
    app.use(VeeValidate);
    app.mount('#app');
  }
});
