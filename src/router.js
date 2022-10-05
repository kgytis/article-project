import Vue from "vue";
import Router from "vue-router";

// Page component imports
import Articles from "./pages/ArticlesPage.vue";
import Article from "./pages/ArticlePage.vue";

Vue.use(Router)
const router = new Router({
    routes: [
      { path: "/", component: Articles },
      { path: "/articles", component: Articles },
      { path: "/articles/:id", component: Article }
    ]
  });


export default router;