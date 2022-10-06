export default {
  // getters for articles (array) and article (empty - string)/pupulated - object
  articles(state) {
    return state.articles;
  },
  article(state) {
    return state.article;
  },
  // getters to check whether articles/article have been fetched
  areArticles(_, getters) {
    return getters.articles && getters.articles.length > 0;
  },
  isArticle(_, getters) {
    return getters.article
  },
  // getters for pagination updates
  pageNumber(state) {
    return state.pageNumber;
  },
  articleNumber(state) {
    return state.articleNumber;
  },
};
