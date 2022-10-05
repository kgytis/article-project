export default {
  articles(state) {
    return state.articles;
  },
  areArticles(_,getters){
    return getters.articles && getters.articles.length > 0
  },
  pageNumber(state){
    return state.pageNumber
  }
};
