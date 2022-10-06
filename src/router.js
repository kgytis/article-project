import Vue from 'vue';
import Router from 'vue-router';

// Page component imports
import Articles from './layouts/ArticlesPage.vue';
import Article from './layouts/ArticlePage.vue';
import PageNotFound from './layouts/PageNotFound.vue'

Vue.use(Router);
const router = new Router({
  routes: [
    { path: '/', component: Articles },
    { path: '/articles', component: Articles },
    { path: '/articles/:id', component: Article, props: true },
    {path : "*", component: PageNotFound}
  ],
});
export default router;
