<template>
  <!-- Flaw when clicking back button in browser, user redirected to first page -->
  <!-- Second flaw, when accessing another article after first was accessed
  previous article data for a moment ar displayed on the screen
   -->
  <container>
    <section v-if="isArticle">
      <article-header :title="article.title" @back="back"></article-header>
      <article-body
        :article="article"
        @editArticle="modalHandle"
        @deleteArticle="deleteArticle"
      ></article-body>
    </section>
    <div v-else-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else-if="!isArticle" class="box is-flex is-justify-content-center is-align-items-center">
      <h1 class="is-size-3 has-text-centered">No such article exists. Posted articles can be found <router-link to="/articles">here.</router-link></h1>

    </div>
    <base-modal :modalToggle="modalToggle" @close-modal="modalHandle">
      <edit-article-form
        :articleId="article.id"
        @save-data="editForm"
        @close-modal="modalHandle"
        :refetch="refetch"
      ></edit-article-form>
    </base-modal>
  </container>
</template>

<script>
import ArticleBody from '../components/article/ArticleBody.vue';
import ArticleHeader from '../components/article/ArticleHeader.vue';
import EditArticleForm from '../components/articles/EditArticleForm.vue';
export default {
  components: { ArticleHeader, ArticleBody, EditArticleForm },
  data() {
    return {
      isLoading: false,
      error: '',
      modalToggle: '',
      refetch: false,
    };
  },
  computed: {
    isArticle() {
      return this.$store.getters['articles/isArticle'];
    },
    article() {
      console.log(this.$store.getters['articles/article']);
      return this.$store.getters['articles/article'];
    },
    articleId() {
      return this.$router.params.id;
    },
  },
  methods: {
    async loadArticle() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('articles/fetchArticle', {
          articleId: this.$route.params.id,
        });
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    modalHandle() {
      this.modalToggle === ''
        ? (this.modalToggle = 'is-active')
        : (this.modalToggle = '');
      this.setRefetch();
    },
    setRefetch() {
      this.refetch = !this.refetch;
    },
    // redundant code. Could send with data whether it is a post action or update
    editForm(data) {
      this.$store.dispatch('articles/editArticle', data);
      this.loadArticle();
      this.$toast.open('Success');
    },
    deleteArticle() {
      this.$store.dispatch('articles/deleteArticle', this.article.id);
      this.$toast.open({
        message: `Successfully deleted article - ${this.article.title}`,
        type: 'info',
      });
      this.back();
    },
    back() {
      this.$router.push('/articles');
    },
    checkArticle() {
      if (this.$route.params.id !== article.id) {
        this.isLoading = true;
      }
    },
  },
  created() {
    this.loadArticle();
  },
};
</script>
