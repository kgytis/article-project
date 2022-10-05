import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/store.js';
// Plugins
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
// Layout imports
import BaseContainer from './components/UI/BaseContainer.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseModal from './components/UI/BaseModal.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import BaseSearch from './components/UI/BaseSearch.vue'
// Component registration
Vue.component('container', BaseContainer);
Vue.component('card', BaseCard);
Vue.component('base-modal', BaseModal);
Vue.component('base-spinner', BaseSpinner);
Vue.component('base-dialog', BaseDialog);
Vue.component('base-search', BaseSearch)

Vue.use(VueToast);

new Vue({
  router, // we tell our vue instance to use this vue router
  store,
  render: (h) => h(App),
}).$mount('#app');
