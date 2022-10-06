export default {
  articles(state) {
    return state.articles;
  },
  article(state){
    return state.article
  },
  areArticles(_,getters){
    return getters.articles && getters.articles.length > 0
  },
  pageNumber(state){
    return state.pageNumber
  },
  articleNumber(state){
    return state.articleNumber
  }
};
