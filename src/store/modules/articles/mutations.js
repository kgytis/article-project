export default {
  setArticles(state, payload) {
    state.articles = payload;
  },
  setArticle(state,payload){
    state.article = payload
  },
  deleteArticle(state, payload) {
    state.articles.filter((article) => {
      article.id !== payload;
    });
  },
  addArticle(state, payload) {
    state.articles.push(payload);
  },
  setPageNumber(state, payload) {
    state.pageNumber = payload;
  },
};
