<template>
  <ul>
    <article-item
      v-for="article in allArticles"
      :key="article.id"
      :article="article"
      @openEdit="modalHandle"
      @itemDeleted="itemDeleted"
    ></article-item>
    <base-modal
      title="Edit article"
      :modalToggle="modalToggle.toggle"
      @close-modal="modalHandle"
    >
      <div>
        <edit-article-form
          :articleId="modalToggle.articleId"
          @close-modal="modalHandle"
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
  props: {
    allArticles: {
      type: Array,
      required: true,
    },
  },
  emits: ['editForm', 'itemDeleted'],
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
    modalHandle(articleId) {
      this.modalToggle.articleId = articleId;
      this.modalToggle.toggle === ''
        ? (this.modalToggle.toggle = 'is-active')
        : (this.modalToggle.toggle = '');
    },
    editForm(data) {
      this.$emit('editForm', data);
    },
    itemDeleted() {
      this.$emit('itemDeleted');
    },
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
