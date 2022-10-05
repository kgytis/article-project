<template>
  <ul>
    <article-item
      v-for="article in allArticles"
      :key="article.id"
      :title="article.title"
      :articleId="article.id"
      :updatedAt="article.updated_at"
      :createdAt="article.created_at"
      :author="article.name"
      :article="article.body"
      @openEdit="modalHandle"
    ></article-item>
    <base-modal :modalToggle="modalToggle.toggle" @close-modal="modalHandle">
      <div>
        <edit-article-form
        :articleId=modalToggle.articleId
        @save-data="editForm"
        ></edit-article-form>
      </div>
    </base-modal>
  </ul>
</template>

<script>
import ArticleItem from './ArticleItem.vue';
import EditArticleForm from './EditArticleForm.vue';
export default {
  props: ['allArticles'],
  emits : ['editForm'],
  components: {
    ArticleItem,
    EditArticleForm,
  },
  data() {
    return {
      modalToggle: {
        toggle: '',
        articleId: '',
        title: '',
        article: '',
      },
    };
  },
  methods: {
    modalHandle(title, article, articleId) {
      this.modalToggle.articleId = articleId;
      this.modalToggle.title = title;
      this.modalToggle.article = article;

      this.modalToggle.toggle === ''
        ? (this.modalToggle.toggle = 'is-active')
        : (this.modalToggle.toggle = '');
    },
    submitForm(data) {
      // this.$store.dispatch('articles/postArticle', data);
      // this.loadArticles();
      console.log(data);
      this.$toast.open('Success');
    },
    editForm(data){
      this.$emit('editForm', data)
    }
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
