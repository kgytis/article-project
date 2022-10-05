<template>
  <container>
    <div class="header">
      <h1>All articles</h1>
      <base-search v-if="areArticles" @search="updateSearch"></base-search>
      <button class="button is-warning" @click="modalHandle">
        New Article
      </button>
    </div>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <h1 v-else-if="!areArticles">No articles have been posted yet.</h1>
    <articles-list
      v-else-if="areArticles && !isLoading"
      :allArticles="allArticles"
      @editForm="editForm"
    ></articles-list>
    <base-modal :modalToggle="modalToggle" @close-modal="modalHandle">
      <article-form
        @close-modal="modalHandle"
        @save-data="submitForm"
      ></article-form>
    </base-modal>
    <!-- additional v-if added if, to upload pagination only when fetch is performed -->
    <articles-pagination
      :pageSize="pageSize"
      :currentPage="currentPage"
      :totalPages="totalPages"
      v-if="totalPages > 0"
      @pageNumber="paginate"
    ></articles-pagination>
  </container>
</template>

<script>
import ArticlesList from '../components/articles/ArticlesList.vue';
import ArticleForm from '../components/articles/ArticleForm.vue';
import ArticlesPagination from '../components/articles/ArticlesPagination.vue';

export default {
  components: {
    ArticlesList,
    ArticleForm,
    ArticlesPagination,
  },
  data() {
    return {
      isLoading: false,
      error: '',
      modalToggle: '',
      pageSize: 5,
      currentPage: 1,
      searchQuery: '',
    };
  },
  computed: {
    allArticles() {
      return this.$store.getters['articles/articles'];
    },
    areArticles() {
      return this.$store.getters['articles/areArticles'];
    },
    totalPages() {
      return this.$store.getters['articles/pageNumber'];
    },
  },
  methods: {
    paginate(page) {
      this.currentPage = page;
    },
    async loadArticles() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('articles/fetchArticles', {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          searchQuery: this.searchQuery,
        });
      } catch (error) {
        this.error = error;
      }
      this.isLoading = false;
    },
    modalHandle() {
      this.modalToggle === ''
        ? (this.modalToggle = 'is-active')
        : (this.modalToggle = '');
    },
    // redundant code. Could send with data whether it is a post action or update
    submitForm(data) {
      this.$store.dispatch('articles/postArticle', data);
      this.loadArticles();
      this.$toast.open('Success');
    },
    editForm(data) {
      this.$store.dispatch('articles/editArticle', data);
      this.loadArticles();
      this.$toast.open('Success');
    },
    updateSearch(payload) {
      this.searchQuery = payload;
      this.loadArticles();
    },
  },
  created() {
    this.loadArticles();
  },
  watch: {
    currentPage() {
      this.loadArticles();
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
</style>
